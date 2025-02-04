import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCreateComponent } from './accounts-create.component';

describe('AccountsCreateComponent', () => {
  let component: AccountsCreateComponent;
  let fixture: ComponentFixture<AccountsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsCreateComponent]
    });
    fixture = TestBed.createComponent(AccountsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
