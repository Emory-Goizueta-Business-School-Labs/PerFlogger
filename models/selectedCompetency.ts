export default class SelectedCompetency {
    public selected: boolean;
    public competency: Competency;

    constructor(competency: Competency, selected: boolean) {
        this.competency = competency;
        this.selected = selected;
    }
}