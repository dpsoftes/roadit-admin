import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnChanges, SimpleChanges, inject, computed, effect, HostListener, signal } from '@angular/core';
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
export class InputMultiTagComponent implements OnInit, OnChanges {
  @Input() label: string = 'Etiquetas';
  @Input()
  set value(val: number[]) {
    console.log('📝 Setter value llamado con:', val);
    this.valueSignal.set(val);
  }
  get value(): number[] {
    return this.valueSignal();
  }
  @Input() tagType: 'DRIVER' | 'CLIENT' = 'DRIVER'; //TIPO DE TAGS A MOSTRAR
  @Output() valueChange = new EventEmitter<number[]>();

  @ViewChild('chipInput') inputRef!: ElementRef<HTMLInputElement>;

  globalStore = inject(GlobalStore); //PÚBLICO PARA USAR EN EL TEMPLATE

  //SIGNAL INTERNA PARA EL VALUE (PARA QUE COMPUTED REACCIONE)
  private valueSignal = signal<number[]>([]);

  isFocused: boolean = false;
  shouldLabelFloat: boolean = false;
  showDropdown: boolean = false;
  searchTermSignal = signal<string>(''); //SIGNAL PARA REACTIVIDAD EN COMPUTED

  //GETTER/SETTER PARA COMPATIBILIDAD
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
    return this.allTags.filter((tag: TagDto) => tag.type === this.tagType);
  });

  //COMPUTED: TAGS FILTRADAS POR BÚSQUEDA
  filteredTags = computed(() => {
    const search = this.searchTermSignal().toLowerCase().trim(); //USAR SIGNAL DIRECTAMENTE
    const language = this.currentLanguage();
    const currentValue = this.valueSignal(); //USAR LA SIGNAL INTERNA

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
    const currentValue = this.valueSignal(); //USAR LA SIGNAL INTERNA
    const tags = currentValue
      .map(tagId => this.availableTags().find(tag => tag.id === tagId))
      .filter(tag => tag !== undefined) as TagDto[];

    console.log('🏷️ Tags seleccionadas computed ejecutado:', tags.length, tags.map(t => ({ id: t.id, name: t.name })));
    return tags;
  });

  //EFECTO PARA ACTUALIZAR CUANDO CAMBIA EL IDIOMA
  constructor(private elementRef: ElementRef) {
    effect(() => {
      //FORZAR ACTUALIZACIÓN CUANDO CAMBIA EL IDIOMA
      const currentLanguage = this.globalStore.language();
      console.log('🌍 Idioma cambiado a:', currentLanguage);
    });
  }

  ngOnInit() {
    console.log('🚀 InputMultiTag iniciado con valueSignal:', this.valueSignal());
    this.updateFloatingState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      console.log('🔄 @Input value cambió:', {
        anterior: changes['value'].previousValue,
        nuevo: changes['value'].currentValue
      });
      this.updateFloatingState();
    }
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
    const currentValue = this.valueSignal();
    const hasValue = currentValue && currentValue.length > 0;
    this.shouldLabelFloat = hasValue || this.isFocused;
  }

  //AÑADIR TAG SELECCIONADA
  addTag(tag: TagDto): void {
    if (!this.value.includes(tag.id!)) {
      const newValues = [...this.value, tag.id!];
      console.log('➕ Añadiendo tag:', tag.id, 'Valores actuales:', this.value, 'Nuevos valores:', newValues);
      this.valueChange.emit(newValues); //SOLO EMITIR, NO MODIFICAR this.value
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
    const newValues = this.value.filter(id => id !== tagId);
    console.log('➖ Eliminando tag:', tagId, 'Valores actuales:', this.value, 'Nuevos valores:', newValues);
    this.valueChange.emit(newValues); //SOLO EMITIR, NO MODIFICAR this.value
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
}
