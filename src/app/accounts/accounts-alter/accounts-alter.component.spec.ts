import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAlterComponent } from './accounts-alter.component';

describe('AccountsAlterComponent', () => {
  let component: AccountsAlterComponent;
  let fixture: ComponentFixture<AccountsAlterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsAlterComponent]
    });
    fixture = TestBed.createComponent(AccountsAlterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
