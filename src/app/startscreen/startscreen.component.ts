import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }  // private deswegen weil wir den router nur hier in der Komponente verwenden(überall wäre dann Public)

  ngOnInit(): void {
  }


  newGame() {
    //Start Game
    let game = new Game();

    console.log('Alle game.ts Arrays', game);

    this.firestore
    .collection('games')
    .add(game.toJson())
      .then((gameInfo: any) => {
        console.log('Infos zum spiel', gameInfo);
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }
}
