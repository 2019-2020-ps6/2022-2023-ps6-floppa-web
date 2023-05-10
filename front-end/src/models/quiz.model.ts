import { Question } from './question.model';
import { Association } from './association.model';

export interface Quiz {
    id: string;
    name: string;
    theme?: string;
    questions?: Question[];
    associations?: Association[];
    users: string[];
    coverImage: string;
}
