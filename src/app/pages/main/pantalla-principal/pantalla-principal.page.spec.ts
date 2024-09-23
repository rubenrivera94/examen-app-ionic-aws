import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallaPrincipalPage } from './pantalla-principal.page';

describe('PantallaPrincipalPage', () => {
  let component: PantallaPrincipalPage;
  let fixture: ComponentFixture<PantallaPrincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
