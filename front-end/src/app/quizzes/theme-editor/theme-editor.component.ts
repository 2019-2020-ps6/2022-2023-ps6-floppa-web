import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { THEME_LIST } from 'src/mocks/quiz-list.mock';

@Component({
  selector: 'app-theme-editor',
  templateUrl: './theme-editor.component.html',
  styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {
  public themeList: string[];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.themeList = THEME_LIST;
    
  }

  ngOnInit(): void {
  }

  goToTheme(themeIndex: number): void {
    this.router.navigate(["/quiz-editor/" + themeIndex]);
  }
}

