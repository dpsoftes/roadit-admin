import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Certification {
  id: string;
  title: string;
  questions: Question[];
  attemptsPerWeek: number;
  availableForNewDrivers: boolean;
}

@Component({
  selector: 'app-certification',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    TranslatePipe,
    ButtonsComponent  
  ],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent {
  certification = input<Certification>(this.getDefaultCertification());
  certificationChange = output<Certification>();
  save = output<Certification>();

  getDefaultCertification(): Certification {
    return {
      id: '',
      title: '',
      questions: [
        {
          id: '1',
          text: '',
          answers: [
            { id: 'A', text: '', isCorrect: true },
            { id: 'B', text: '', isCorrect: false },
            { id: 'C', text: '', isCorrect: false }
          ]
        },
        {
          id: '2',
          text: '',
          answers: [
            { id: 'A', text: '', isCorrect: true },
            { id: 'B', text: '', isCorrect: false },
            { id: 'C', text: '', isCorrect: false }
          ]
        }
      ],
      attemptsPerWeek: 1,
      availableForNewDrivers: false
    };
  }



  toggleCorrectAnswer(questionId: string, answerId: string): void {
    const currentCert = this.certification();
    const question = currentCert.questions.find(q => q.id === questionId);
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      if (answer) {
        question.answers.forEach(a => a.isCorrect = false);
        answer.isCorrect = true;
        this.emitChanges();
      }
    }
  }

  updateTitle(title: string): void {
    const currentCert = this.certification();
    currentCert.title = title;
    this.emitChanges();
  }

  updateQuestionText(questionId: string, text: string): void {
    const currentCert = this.certification();
    const question = currentCert.questions.find(q => q.id === questionId);
    if (question) {
      question.text = text;
      this.emitChanges();
    }
  }

  updateAnswerText(questionId: string, answerId: string, text: string): void {
    const currentCert = this.certification();
    const question = currentCert.questions.find(q => q.id === questionId);
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      if (answer) {
        answer.text = text;
        this.emitChanges();
      }
    }
  }

  updateAttemptsPerWeek(attempts: number): void {
    const currentCert = this.certification();
    currentCert.attemptsPerWeek = attempts;
    this.emitChanges();
  }

  updateAvailableForNewDrivers(available: boolean): void {
    const currentCert = this.certification();
    currentCert.availableForNewDrivers = available;
    this.emitChanges();
  }

  onSave(): void {
    this.save.emit(this.certification());
    this.certificationChange.emit({
      type: 'save',
      certification: this.certification()
    } as any);
  }

  private emitChanges(): void {
    this.certificationChange.emit(this.certification());
  }
}
