export class Game {
    public players: string[] = [];  // public das man von überall darauf zugreifen kann
    public stack: string[] = [];  // mit string [] sagen wir das es ein Array nur mit Buchstaben(strings) ist, keine Zhalen oder Booleans
    public playedCards: string[] = [];
    public currentPlayer: number = 0;  // hier sagen wir das es nur Zahlen sind


    constructor() {  // wird IMMER am ANFANG aufgerufen
        for (let i = 1; i < 14; i++) {  // Itterieren das Array von 1 bis 13(da kleines als 14) durch
            this.stack.push('spade_' + i);  // pushen in stack spade_i(i ist dann 1,2,3 usw)
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack);
    }
}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  