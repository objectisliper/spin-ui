import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {AuthGuard} from "~/app/guards/auth.guard";

const routes: Routes = [
    { path: "", redirectTo: "/add-test", pathMatch: "full" },
    {
        path: "auth",
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: "add-test",
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/add-test/add-test.module').then(m => m.AddTestModule),
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
