import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;  // Variable heist game vom Typ Game(game.ts)
  games$: Observable<any>;
  todos: Array<any>;

  constructor(private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    const coll = collection(this.firestore, 'games');
    this.games$ = collectionData(coll); 

    this.games$.subscribe( (game) => {  // damit Abonieren wir udas Array games$ und sobalt sich was verändert darin führt es die Funktion aus. In dem Fall console log um uns zu Informieren
      console.log('Game update', game);
    });
  }


  newGame() {
    this.game = new Game();  // hier wird ein leeres JSON Array erstellt wo alle Eigenschaften aus Game.ts drin sind
    console.log(this.game);
    const coll = collection(this.firestore, 'games');  // Hier greifen wir wieder auf die Collection games zu die auf Firebase ist
    setDoc(doc(coll), {name: 'Hallo Welt'});  // Hier sagen wir das wir der Collection(Array) games was hinzufügen wollen, und zwar das Feld name mit dem Wert HAllo Welt

    // setDoc(doc(coll), {this.game.toJson()});   wirft fehler
  }


  takeCard() {
    if (!this.pickCardAnimation) {  // wird nur ausgeführt wenn pickCardAnimation false ist(! ist false)
      this.currentCard = this.game.stack.pop();  // das pop gibt uns den Letzten Wert des Array zurück und wird entfernt aus dem Array
      this.pickCardAnimation = true;
      console.log('New Card:' + this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;  // Erhöht nach dem Karteziehen die Currentplay Zahl, damit wir den Spieler wechseln
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;  // Hier verwenden wir Modulo somit kann die Zahl nicht Größer sein als die Zahl im  Arry und wir starten wieder bei 0
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);  // durch den Timeout können wir nur aller 1 sec eine neue Karte ziehen
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {

    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {  // Zuerst schaueb wir ob die Variable name existiert, wenn ja überprüfen wir ob die Buchstabenlänge von name größer als 0 ist, dann fügt es den Spieler ein
        this.game.players.push(name);  // Hier fügen wir den namen den wir eingegeben haben im Dialogfeld in das Array game.players ein
      }
    });
  }

}
