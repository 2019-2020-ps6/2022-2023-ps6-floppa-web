import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { THEME_QUIZ_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public themeList: string[];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.themeList = [];
    
    for(let i = 0; i < THEME_QUIZ_LIST.length; i++) {
      this.themeList.push(THEME_QUIZ_LIST[i].title);
    }
    
  }

  ngOnInit(): void {
  }

  goToTheme(themeIndex: number): void {
    this.router.navigate(["/quiz-editor/" + themeIndex]);
  }
}

