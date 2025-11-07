import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { AddressType } from '@enums/transport.enum';
import { TransportAddress, TransportAddressOpeningHour } from '@dtos/transports/transport-address.dto';
import { ISO_COUNTRIES } from '@dtos/country-langs.dto';

interface PhoneContact {
  id: string;
  countryCode: string;
  number: string;
}

interface EmailContact {
  id: string;
  email: string;
}

interface TimeSlot {
  id: string;
  days: number[];
  fromTime: string;
  toTime: string;
}

@Component({
  selector: 'app-edit-address-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    TranslatePipe,
    ButtonsComponent
  ],
  templateUrl: './edit-address-modal.component.html',
  styleUrl: './edit-address-modal.component.scss',
  host: {
    'style': 'display: block; width: 100%; background: transparent;'
  }
})
export class EditAddressModalComponent {
  private dialogRef = inject(MatDialogRef<EditAddressModalComponent>);

  // Datos dirección
  name = signal<string>('');
  addressType = signal<AddressType>(AddressType.PRIVATE);
  fullAddress = signal<string>('');
  isFavorite = signal<boolean>(false);

  // Contactos
  contactName = signal<string>('');
  mainPhone = signal<PhoneContact>({ id: '1', countryCode: 'ES', number: '' });
  additionalPhones = signal<PhoneContact[]>([{ id: `phone_${Date.now()}`, countryCode: 'ES', number: '' }]);
  additionalEmails = signal<EmailContact[]>([{ id: `email_${Date.now()}`, email: '' }]);
  overwriteContact = signal<boolean>(false);
  
  // Saber si estamos editando o creando
  isEditing = signal<boolean>(false);

  // Horarios
  declareOpeningHours = signal<boolean>(false);
  timeSlots = signal<TimeSlot[]>([]);

  // Días de la semana
  weekDays = [
    { value: 0, label: 'L', fullName: 'Lunes' },
    { value: 1, label: 'M', fullName: 'Martes' },
    { value: 2, label: 'X', fullName: 'Miércoles' },
    { value: 3, label: 'J', fullName: 'Jueves' },
    { value: 4, label: 'V', fullName: 'Viernes' },
    { value: 5, label: 'S', fullName: 'Sábado' },
    { value: 6, label: 'D', fullName: 'Domingo' }
  ];

  // Tipos de dirección
  addressTypes = Object.values(AddressType);

  // Mapeo de códigos telefónicos por país (ISO 3166-1 alpha-2)
  private countryDialCodes: Record<string, string> = {
    'ES': '+34', 'FR': '+33', 'PT': '+351', 'IT': '+39', 'DE': '+49', 'GB': '+44', 'US': '+1', 'CA': '+1',
    'MX': '+52', 'AR': '+54', 'BR': '+55', 'CL': '+56', 'CO': '+57', 'PE': '+51', 'VE': '+58', 'EC': '+593',
    'UY': '+598', 'PY': '+595', 'BO': '+591', 'CR': '+506', 'PA': '+507', 'DO': '+1', 'CU': '+53', 'HT': '+509',
    'JM': '+1', 'TT': '+1', 'BB': '+1', 'BS': '+1', 'AG': '+1', 'GD': '+1', 'KN': '+1', 'LC': '+1', 'VC': '+1',
    'NL': '+31', 'BE': '+32', 'CH': '+41', 'AT': '+43', 'SE': '+46', 'NO': '+47', 'DK': '+45', 'FI': '+358',
    'PL': '+48', 'CZ': '+420', 'HU': '+36', 'RO': '+40', 'BG': '+359', 'GR': '+30', 'IE': '+353', 'IS': '+354',
    'LU': '+352', 'MT': '+356', 'CY': '+357', 'LI': '+423', 'MC': '+377', 'AD': '+376', 'SM': '+378', 'VA': '+39',
    'RU': '+7', 'UA': '+380', 'BY': '+375', 'MD': '+373', 'LT': '+370', 'LV': '+371', 'EE': '+372', 'KZ': '+7',
    'UZ': '+998', 'GE': '+995', 'AM': '+374', 'AZ': '+994', 'TJ': '+992', 'TM': '+993', 'KG': '+996', 'MN': '+976',
    'CN': '+86', 'JP': '+81', 'KR': '+82', 'IN': '+91', 'ID': '+62', 'MY': '+60', 'TH': '+66', 'VN': '+84',
    'PH': '+63', 'SG': '+65', 'MM': '+95', 'KH': '+855', 'LA': '+856', 'BN': '+673', 'TL': '+670', 'PK': '+92',
    'BD': '+880', 'LK': '+94', 'NP': '+977', 'BT': '+975', 'MV': '+960', 'AF': '+93', 'IR': '+98', 'IQ': '+964',
    'SA': '+966', 'AE': '+971', 'QA': '+974', 'KW': '+965', 'BH': '+973', 'OM': '+968', 'YE': '+967', 'JO': '+962',
    'LB': '+961', 'SY': '+963', 'IL': '+972', 'PS': '+970', 'TR': '+90', 'EG': '+20', 'SD': '+249', 'LY': '+218',
    'TN': '+216', 'DZ': '+213', 'MA': '+212', 'EH': '+212', 'SN': '+221', 'MR': '+222', 'ML': '+223', 'NE': '+227',
    'TD': '+235', 'NG': '+234', 'CM': '+237', 'CF': '+236', 'GA': '+241', 'CG': '+242', 'CD': '+243', 'AO': '+244',
    'ZM': '+260', 'ZW': '+263', 'BW': '+267', 'NA': '+264', 'ZA': '+27', 'LS': '+266', 'SZ': '+268', 'MZ': '+258',
    'MG': '+261', 'MU': '+230', 'SC': '+248', 'KM': '+269', 'YT': '+262', 'RE': '+262', 'KE': '+254', 'TZ': '+255',
    'UG': '+256', 'RW': '+250', 'BI': '+257', 'ET': '+251', 'ER': '+291', 'DJ': '+253', 'SO': '+252', 'GH': '+233',
    'TG': '+228', 'BJ': '+229', 'BF': '+226', 'CI': '+225', 'GN': '+224', 'GW': '+245', 'SL': '+232', 'LR': '+231',
    'AU': '+61', 'NZ': '+64', 'FJ': '+679', 'PG': '+675', 'SB': '+677', 'VU': '+678', 'NC': '+687', 'PF': '+689',
    'WS': '+685', 'TO': '+676', 'TV': '+688', 'KI': '+686', 'NR': '+674', 'MH': '+692', 'FM': '+691', 'PW': '+680',
    'GU': '+1', 'AS': '+1', 'MP': '+1', 'PR': '+1', 'VI': '+1'
  };

  // Códigos de país con dial codes
  countryCodes = Object.entries(ISO_COUNTRIES)
    .map(([code, data]) => ({
      code,
      dialCode: this.countryDialCodes[code] || '',
      name: data.description
    }))
    .filter(country => country.dialCode) // Solo incluir países con código telefónico
    .sort((a, b) => {
      // Priorizar España primero
      if (a.code === 'ES') return -1;
      if (b.code === 'ES') return 1;
      // Luego ordenar alfabéticamente por nombre
      return a.name.localeCompare(b.name);
    });

  onClose() {
    this.dialogRef.close();
  }

  onToggleFavorite() {
    this.isFavorite.set(!this.isFavorite());
  }

  onMainPhoneCountryChange(countryCode: string) {
    const current = this.mainPhone();
    this.mainPhone.set({ ...current, countryCode });
  }

  onMainPhoneNumberChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const current = this.mainPhone();
    this.mainPhone.set({ ...current, number: target.value });
  }

  onAdditionalPhoneCountryChange(phoneId: string, countryCode: string) {
    const phones = this.additionalPhones();
    const phone = phones.find(p => p.id === phoneId);
    if (phone) {
      phone.countryCode = countryCode;
      this.additionalPhones.set([...phones]);
    }
  }

  onAdditionalPhoneNumberChange(phoneId: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const phones = this.additionalPhones();
    const phone = phones.find(p => p.id === phoneId);
    if (phone) {
      phone.number = target.value;
      this.additionalPhones.set([...phones]);
    }
  }

  onEmailChange(emailId: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const emails = this.additionalEmails();
    const email = emails.find(e => e.id === emailId);
    if (email) {
      email.email = target.value;
      this.additionalEmails.set([...emails]);
    }
  }

  onAddPhone() {
    const newPhone: PhoneContact = {
      id: `phone_${Date.now()}`,
      countryCode: 'ES',
      number: ''
    };
    this.additionalPhones.set([...this.additionalPhones(), newPhone]);
  }

  onRemovePhone(phoneId: string) {
    this.additionalPhones.set(this.additionalPhones().filter(p => p.id !== phoneId));
  }

  onAddEmail() {
    const newEmail: EmailContact = {
      id: `email_${Date.now()}`,
      email: ''
    };
    const current = this.additionalEmails();
    this.additionalEmails.set([...current, newEmail]);
  }

  onRemoveEmail(emailId: string) {
    this.additionalEmails.set(this.additionalEmails().filter(e => e.id !== emailId));
  }

  onAddTimeSlot() {
    const newSlot: TimeSlot = {
      id: `slot_${Date.now()}`,
      days: [],
      fromTime: '08:00',
      toTime: '14:00'
    };
    this.timeSlots.set([...this.timeSlots(), newSlot]);
  }

  onRemoveTimeSlot(slotId: string) {
    this.timeSlots.set(this.timeSlots().filter(s => s.id !== slotId));
  }

  onToggleDay(slotId: string, day: number) {
    const slots = this.timeSlots();
    const slot = slots.find(s => s.id === slotId);
    if (slot) {
      const dayIndex = slot.days.indexOf(day);
      if (dayIndex > -1) {
        slot.days.splice(dayIndex, 1);
      } else {
        slot.days.push(day);
      }
      this.timeSlots.set([...slots]);
    }
  }

  isDaySelected(slotId: string, day: number): boolean {
    const slot = this.timeSlots().find(s => s.id === slotId);
    return slot ? slot.days.includes(day) : false;
  }

  onTimeSlotChange(slotId: string, field: 'fromTime' | 'toTime', value: string) {
    const slots = this.timeSlots();
    const slot = slots.find(s => s.id === slotId);
    if (slot) {
      slot[field] = value;
      this.timeSlots.set([...slots]);
    }
  }

  onSave() {
    const addressData: Partial<TransportAddress> = {
      title: this.name(),
      address_type: this.addressType(),
      description: this.fullAddress(),
      contact_name: this.contactName(),
      contact_phone: this.mainPhone().number,
      contact_email: this.additionalEmails().length > 0 ? this.additionalEmails()[0].email : undefined,
      opening_hours: this.declareOpeningHours() ? this.timeSlots().map(slot => {
        const oh: Partial<TransportAddressOpeningHour> = {
          open_time: slot.fromTime,
          close_time: slot.toTime,
          weekday: slot.days[0] // Simplified - en realidad cada día debería ser un opening hour separado
        };
        return oh as TransportAddressOpeningHour;
      }) : undefined
    };

    this.dialogRef.close(addressData);
  }
}

