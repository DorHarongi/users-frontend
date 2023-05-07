import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { AppComponent } from './app.component';
import { MapModule } from './map/map.module';
import { UserService } from './shared/services/user.service';
import { SharedModule } from './shared/shared.module';
import { SidePanelModule } from './side-panel/side-panel.module';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

export function loadUsers(userService: UserService): () => Promise<any> {
  return () => firstValueFrom(userService.getUsers());
}

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri: "http://129.159.146.118:4900/graphql"}),  // HERE WE WILL PUT OUR GRAPHQL URL
    cache: new InMemoryCache(),
  };
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    SidePanelModule,
    SharedModule,
    ApolloModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadUsers,
      deps: [UserService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
