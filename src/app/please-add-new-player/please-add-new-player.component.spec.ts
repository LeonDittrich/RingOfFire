import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseAddNewPlayerComponent } from './please-add-new-player.component';

describe('PleaseAddNewPlayerComponent', () => {
  let component: PleaseAddNewPlayerComponent;
  let fixture: ComponentFixture<PleaseAddNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseAddNewPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseAddNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
