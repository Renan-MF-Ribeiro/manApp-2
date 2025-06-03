import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasherComponent } from './casher.component';

describe('CasherComponent', () => {
  let component: CasherComponent;
  let fixture: ComponentFixture<CasherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
