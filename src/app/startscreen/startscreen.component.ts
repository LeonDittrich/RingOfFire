import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  constructor(private router: Router) { }  // private deswegen weil wir den router nur hier in der Komponente verwenden(überall wäre dann Public)

  ngOnInit(): void {
  }


  newGame() {
    //Start Game
    let newGameID = "";
    this.router.navigateByUrl('/game/' + newGameID)
  }
}
