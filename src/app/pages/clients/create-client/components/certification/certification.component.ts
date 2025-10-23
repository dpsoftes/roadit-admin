import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() certification: Certification = this.getDefaultCertification();
  @Output() certificationChange = new EventEmitter<Certification>();
  @Output() save = new EventEmitter<Certification>();

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
    const question = this.certification.questions.find(q => q.id === questionId);
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      if (answer) {
        // Solo permitir una respuesta correcta por pregunta
        question.answers.forEach(a => a.isCorrect = false);
        answer.isCorrect = true;
        this.emitChanges();
      }
    }
  }

  updateTitle(title: string): void {
    this.certification.title = title;
    this.emitChanges();
  }

  updateQuestionText(questionId: string, text: string): void {
    const question = this.certification.questions.find(q => q.id === questionId);
    if (question) {
      question.text = text;
      this.emitChanges();
    }
  }

  updateAnswerText(questionId: string, answerId: string, text: string): void {
    const question = this.certification.questions.find(q => q.id === questionId);
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      if (answer) {
        answer.text = text;
        this.emitChanges();
      }
    }
  }

  updateAttemptsPerWeek(attempts: number): void {
    this.certification.attemptsPerWeek = attempts;
    this.emitChanges();
  }

  updateAvailableForNewDrivers(available: boolean): void {
    this.certification.availableForNewDrivers = available;
    this.emitChanges();
  }

  onSave(): void {
    this.save.emit(this.certification);
  }

  private emitChanges(): void {
    this.certificationChange.emit(this.certification);
  }
}
