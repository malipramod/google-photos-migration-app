import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { LoginComponentService } from "../login-component/login-component.service";
import { Observable } from "rxjs";

export class MigrationInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginComponentService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const copiedReq = req.clone({
            params: req.params.set('Authorization', localStorage.getItem("GoogleTokenSrc"))
        });

        return next.handle(copiedReq);
    }
}