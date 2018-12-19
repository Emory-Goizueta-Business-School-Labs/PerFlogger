interface LogItem {
    id?: number;
    date: Date;
    comments: string;
    competencies: Array<Competency>;
}