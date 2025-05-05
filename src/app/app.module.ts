import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
@NgModule({
  providers: [{provide: APP_BASE_HREF, useValue: '/quiosque'}]
})
class AppModule {}