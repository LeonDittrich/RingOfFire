import { Component, OnInit } from '@angular/core';
import { Firestore, collection, setDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) { }  // private deswegen weil wir den router nur hier in der Komponente verwenden(überall wäre dann Public)

  ngOnInit(): void {
  }


  newGame() {
    //Start Game

    let game = new Game();

    console.log('Alle game.ts Arrays', game);
    const coll = collection(this.firestore, 'games');  // Hier greifen wir wieder auf die Collection games zu die auf Firebase ist

    setDoc(doc(coll), {newGame: game.toJson()}).then((gameInfo: any) => {
      console.log('Infos zum spiel', gameInfo);
      this.router.navigateByUrl('/game/' + gameInfo['id']);
    });

    //let gameID = "";
  }
}
