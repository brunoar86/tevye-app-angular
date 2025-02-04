import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsDeleteComponent } from './accounts-delete.component';

describe('AccountsDeleteComponent', () => {
  let component: AccountsDeleteComponent;
  let fixture: ComponentFixture<AccountsDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsDeleteComponent]
    });
    fixture = TestBed.createComponent(AccountsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
