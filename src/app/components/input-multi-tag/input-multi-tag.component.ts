import { Component, ElementRef, ViewChild, OnInit, inject, computed, effect, HostListener, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalStore } from '@store/global.state';
import { TagDto } from '@dtos';

@Component({
  selector: 'input-multi-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-multi-tag.component.html',
  styleUrls: ['./input-multi-tag.component.scss']
})
export class InputMultiTagComponent implements OnInit {
  //INPUT SIGNALS (FORMA MODERNA DE ANGULAR 20)
  label = input<string>('Etiquetas'); //LABEL DEL COMPONENTE
  value = input<number[]>([]); //VALORES SELECCIONADOS (IDS DE TAGS)
  tagType = input<'DRIVER' | 'CLIENT'>('DRIVER'); //TIPO DE TAGS A MOSTRAR
  maxWidth = input<string | null>(null); //ANCHO MÁXIMO DEL COMPONENTE (EJ: '246px')
  filterStyle = input<boolean>(false); //SI TRUE, APLICA ESTILOS DE FILTRO

  //OUTPUT SIGNAL (FORMA MODERNA DE ANGULAR 20)
  valueChange = output<number[]>();

  @ViewChild('chipInput') inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('chipsContainer') chipsContainerRef!: ElementRef<HTMLDivElement>;

  globalStore = inject(GlobalStore); //PÚBLICO PARA USAR EN EL TEMPLATE

  isFocused: boolean = false;
  shouldLabelFloat: boolean = false;
  showDropdown: boolean = false;
  searchTermSignal = signal<string>(''); //SIGNAL PARA REACTIVIDAD EN COMPUTED

  //SIGNALS PARA CONTROLAR CUÁNTAS TAGS SON VISIBLES
  visibleTagsCount = signal<number>(0);
  hiddenTagsCount = signal<number>(0);

  //GETTER/SETTER PARA COMPATIBILIDAD CON BÚSQUEDA
  get searchTerm(): string {
    return this.searchTermSignal();
  }
  set searchTerm(value: string) {
    this.searchTermSignal.set(value);
  }

  //OBTENER TODAS LAS TAGS DEL GLOBALSTORE
  allTags = this.globalStore.tags();

  //COMPUTED: IDIOMA ACTUAL
  currentLanguage = computed(() => this.globalStore.language() as 'es' | 'en');

  //COMPUTED: FILTRAR TAGS POR TIPO
  availableTags = computed(() => {
    return this.allTags.filter((tag: TagDto) => tag.type === this.tagType());
  });

  //COMPUTED: TAGS FILTRADAS POR BÚSQUEDA
  filteredTags = computed(() => {
    const search = this.searchTermSignal().toLowerCase().trim();
    const language = this.currentLanguage();
    const currentValue = this.value();

    if (!search) {
      //MOSTRAR SOLO LAS QUE NO ESTÁN SELECCIONADAS
      return this.availableTags().filter(tag => !currentValue.includes(tag.id!));
    }

    //FILTRAR POR NOMBRE EN EL IDIOMA ACTUAL
    return this.availableTags().filter(tag => {
      const tagName = this.getTagName(tag, language).toLowerCase();
      return tagName.includes(search) && !currentValue.includes(tag.id!);
    });
  });

  //COMPUTED: TAGS SELECCIONADAS
  selectedTags = computed(() => {
    const currentValue = this.value();
    const tags = currentValue
      .map(tagId => this.availableTags().find(tag => tag.id === tagId))
      .filter(tag => tag !== undefined) as TagDto[];

    console.log('🏷️ Tags seleccionadas computed ejecutado:', tags.length, tags.map(t => ({ id: t.id, name: t.name })));
    return tags;
  });

  //EFFECT PARA RECALCULAR OVERFLOW CUANDO CAMBIA VALUE
  constructor(private elementRef: ElementRef) {
    //EFECTO PARA ACTUALIZAR CUANDO CAMBIA EL IDIOMA
    effect(() => {
      const currentLanguage = this.globalStore.language();
      console.log('🌍 Idioma cambiado a:', currentLanguage);
    });

    //EFECTO PARA RECALCULAR OVERFLOW CUANDO CAMBIA VALUE
    effect(() => {
      const currentValue = this.value();
      const maxW = this.maxWidth();

      console.log('🔄 Effect: value cambió:', currentValue.length, 'maxWidth:', maxW);

      if (maxW) {
        //USAR setTimeout PARA ASEGURAR QUE EL DOM ESTÉ ACTUALIZADO
        setTimeout(() => this.calculateVisibleTags(), 100);
      }

      this.updateFloatingState();
    });
  }

  ngOnInit() {
    console.log('🚀 InputMultiTag iniciado con value:', this.value());
    this.updateFloatingState();

    //SI HAY ANCHO MÁXIMO, CALCULAR OVERFLOW DESPUÉS DE RENDERIZAR
    if (this.maxWidth()) {
      setTimeout(() => this.calculateVisibleTags(), 100);
    }
  }

  //CALCULAR CUÁNTAS TAGS SON VISIBLES CON EL ANCHO MÁXIMO
  calculateVisibleTags(): void {
    const maxW = this.maxWidth();

    if (!maxW || !this.chipsContainerRef) {
      console.log('⏭️ Sin maxWidth o sin ref, skip cálculo');
      return;
    }

    const container = this.chipsContainerRef.nativeElement;
    const chips = Array.from(container.querySelectorAll('.chip')) as HTMLElement[];

    if (chips.length === 0) {
      this.visibleTagsCount.set(0);
      this.hiddenTagsCount.set(0);
      console.log('⏭️ Sin chips, reset contadores');
      return;
    }

    const containerWidth = container.offsetWidth;
    const indicatorWidth = 60; //ESPACIO RESERVADO PARA "+X"
    const inputMinWidth = 80; //ANCHO MÍNIMO PARA EL INPUT

    let totalWidth = 0;
    let visibleCount = 0;
    const gap = 6; //GAP ENTRE CHIPS

    for (let i = 0; i < chips.length; i++) {
      const chipWidth = chips[i].offsetWidth + gap;

      //SI ES LA ÚLTIMA CHIP O SI AÑADIR ESTA CHIP DEJARÍA ESPACIO PARA EL INPUT
      if (totalWidth + chipWidth + inputMinWidth <= containerWidth - (i < chips.length - 1 ? indicatorWidth : 0)) {
        totalWidth += chipWidth;
        visibleCount++;
      } else {
        break;
      }
    }

    this.visibleTagsCount.set(visibleCount);
    this.hiddenTagsCount.set(chips.length - visibleCount);

    console.log('📊 Overflow calculado:', {
      total: chips.length,
      visible: visibleCount,
      hidden: chips.length - visibleCount,
      containerWidth
    });
  }

  onFocus() {
    console.log('👁️ Input enfocado');
    this.isFocused = true;
    this.showDropdown = true;
    this.updateFloatingState();
  }

  onBlur(): void {
    console.log('👁️ Input desenfocado');
    this.isFocused = false;
    //NO CERRAR EL DROPDOWN AQUÍ
    //Se cerrará con el HostListener cuando se haga click fuera
    this.updateFloatingState();
  }

  //DETECTAR CLICKS FUERA DEL COMPONENTE
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside && this.showDropdown) {
      console.log('🖱️ Click fuera detectado - cerrando dropdown');
      this.showDropdown = false;
      this.searchTerm = '';
      if (this.inputRef) {
        this.inputRef.nativeElement.value = '';
      }
    }
  }

  updateFloatingState() {
    const currentValue = this.value();
    const hasValue = currentValue && currentValue.length > 0;
    this.shouldLabelFloat = hasValue || this.isFocused;
  }

  //AÑADIR TAG SELECCIONADA
  addTag(tag: TagDto): void {
    const currentValue = this.value();

    if (!currentValue.includes(tag.id!)) {
      const newValues = [...currentValue, tag.id!];
      console.log('➕ Añadiendo tag:', tag.id, 'Valores actuales:', currentValue, 'Nuevos valores:', newValues);
      this.valueChange.emit(newValues); //EMITIR USANDO OUTPUT SIGNAL
    }

    //LIMPIAR BÚSQUEDA PERO MANTENER DROPDOWN ABIERTO Y FOCUS
    this.searchTerm = '';
    if (this.inputRef) {
      this.inputRef.nativeElement.value = '';
      this.inputRef.nativeElement.focus(); //MANTENER FOCUS PARA SEGUIR SELECCIONANDO
    }
    //NO CERRAR showDropdown - Permanece abierto para seguir seleccionando
    this.updateFloatingState();
  }

  //ELIMINAR TAG SELECCIONADA
  removeTag(tagId: number): void {
    const currentValue = this.value();
    const newValues = currentValue.filter(id => id !== tagId);

    console.log('➖ Eliminando tag:', tagId, 'Valores actuales:', currentValue, 'Nuevos valores:', newValues);
    this.valueChange.emit(newValues); //EMITIR USANDO OUTPUT SIGNAL
    this.updateFloatingState();

    //MANTENER FOCUS EN EL INPUT PARA SEGUIR INTERACTUANDO
    if (this.inputRef) {
      this.inputRef.nativeElement.focus();
    }
    //SI EL INPUT ESTÁ ENFOCADO, MANTENER DROPDOWN ABIERTO
    if (this.isFocused) {
      this.showDropdown = true;
    }
  }

  //MANEJAR INPUT DE BÚSQUEDA
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value; //USA EL SETTER QUE ACTUALIZA LA SIGNAL
    console.log('🔍 Búsqueda:', this.searchTerm, 'Tags filtradas:', this.filteredTags().length);
  }

  //HELPER: OBTENER NOMBRE DE TAG EN EL IDIOMA ACTUAL
  getTagName(tag: TagDto, language: 'es' | 'en' = 'es'): string {
    if (typeof tag.getName === 'function') {
      return tag.getName(language);
    }
    if (tag.name && typeof tag.name === 'object') {
      return tag.name[language] || tag.name.es || '';
    }
    if (typeof tag.name === 'string') {
      return tag.name;
    }
    return 'Sin nombre';
  }

  //HELPER: OBTENER COLOR DE TAG CON #
  getTagColor(tag: TagDto): string {
    if (!tag) {
      console.warn('⚠️ Tag undefined o null');
      return '#999999';
    }

    if (typeof tag.getColorWithHash === 'function') {
      const color = tag.getColorWithHash();
      console.log('🎨 Color desde getColorWithHash:', color, 'para tag:', tag.id);
      return color || '#999999';
    }

    if (tag.color) {
      const color = tag.color.startsWith('#') ? tag.color : `#${tag.color}`;
      console.log('🎨 Color desde tag.color:', color, 'para tag:', tag.id);
      return color;
    }

    console.warn('⚠️ Tag sin color:', tag.id);
    return '#999999';
  }

  //HELPER: CALCULAR SI EL COLOR ES CLARO U OSCURO
  isLightColor(hexColor: string): boolean {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }

  //OBTENER COLOR DE TEXTO SEGÚN FONDO
  getTextColor(backgroundColor: string): string {
    return this.isLightColor(backgroundColor) ? '#000000' : '#ffffff';
  }

  //DETERMINAR SI UN CHIP DEBE MOSTRARSE BASÁNDOSE EN EL ÍNDICE
  shouldShowChip(index: number): boolean {
    if (!this.maxWidth()) return true; //SI NO HAY LÍMITE, MOSTRAR TODOS
    return index < this.visibleTagsCount();
  }
}
