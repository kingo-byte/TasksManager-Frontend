import{Bb as x,C as v,Db as E,Fa as a,Fb as l,G as b,Gb as M,H as S,Hb as j,Kb as k,Lb as L,Ma as y,Mb as A,Na as C,Oa as c,Rb as T,Sb as _,Tb as U,Ub as P,Vb as R,X as s,Xa as q,Y as u,bb as I,gb as g,ja as m,ra as o,sa as r,ta as p,wa as w,wb as F,xb as N,zb as f}from"./chunk-JDUNLPA5.js";var $=i=>({"border border-danger":i}),Y=()=>["/sign-up"],O=(()=>{class i{constructor(n,t,e,d){this.signInBuilder=n,this.router=t,this.authService=e,this.toastr=d,this.isLoggedIn=q(()=>this.authService.isLoggedInSignal()),this.signInForm=this.signInBuilder.group({email:["",[l.required,l.email]],password:["",[l.required,l.pattern("^(?!\\s*$).+")]]}),this.isLoggedIn()&&this.router.navigate(["main"])}onSignInSubmit(){let n={email:this.signInForm.get("email").value,password:this.signInForm.get("password").value};this.signInForm.valid?this.authService.signIn(n).subscribe({next:t=>{this.authService.setToken(t.accessToken,t.refreshToken),this.authService.isLoggedInSignal.set(!0),this.router.navigate(["main"])},error:t=>{let e=t.error.errors,d="";for(let h in e)e.hasOwnProperty(h)&&(d+=`${e[h].join(", ")}
`);this.toastr.error(d,t.error.title)}}):this.signInForm.markAllAsTouched()}static{this.\u0275fac=function(t){return new(t||i)(u(_),u(F),u(x),u(R))}}static{this.\u0275cmp=b({type:i,selectors:[["app-sign-in"]],standalone:!0,features:[y],decls:24,vars:11,consts:[[1,"container-fluid","router-content","map-container"],[1,"row","h-100","flex-column"],[1,"col"],[1,"d-flex","align-items-center","justify-content-center","h-100"],[1,"card","shadow-lg","p-4",2,"width","500px","border-radius","20px"],[1,"card-body"],[1,"card-title","text-center","mb-4",2,"color","#007bff"],[3,"submit","formGroup"],[1,"form-group"],["for","email"],["type","email","id","email","placeholder","Enter your email","formControlName","email",1,"form-control",3,"maxlength","ngClass"],[1,"form-group","mt-3"],["for","password"],["type","password","id","password","placeholder","Enter your password","formControlName","password",1,"form-control",3,"ngClass"],["type","submit",1,"btn","btn-primary","btn-block","btn-login","mt-4","w-100",3,"disabled"],[1,"text-center","mt-2"],[1,"text-primary",3,"routerLink"]],template:function(t,e){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h3",6),a(7," Login "),r(),o(8,"form",7),w("submit",function(){return e.onSignInSubmit()}),o(9,"div",8)(10,"label",9),a(11,"Email"),r(),p(12,"input",10),r(),o(13,"div",11)(14,"label",12),a(15,"Password"),r(),p(16,"input",13),r(),o(17,"button",14),a(18," Sign In "),r()(),o(19,"div",15)(20,"span"),a(21,"Don't have an account? "),r(),o(22,"a",16),a(23,"Sign Up"),r()()()()()()()()),t&2&&(s(8),m("formGroup",e.signInForm),s(4),m("maxlength",250)("ngClass",c(6,$,e.signInForm.get("email").invalid&&e.signInForm.get("email").touched)),s(4),m("ngClass",c(8,$,e.signInForm.get("password").invalid&&e.signInForm.get("password").touched)),s(),m("disabled",e.signInForm.invalid),s(5),m("routerLink",C(10,Y)))},dependencies:[P,k,E,M,j,T,L,A,g,I,f,N]})}}return i})();function B(i){let G=i.get("password")?.value,n=i.get("confirmPassword")?.value;return G&&n&&G.trim()!==n.trim()?{passwordMismatch:!0}:null}var V=i=>({"border border-danger":i}),Z=()=>[""],H=(()=>{class i{constructor(n,t,e,d){this.fb=n,this.authService=t,this.router=e,this.toastr=d}ngOnInit(){this.fg=this.fb.group({userName:[null,[l.pattern("^(?!\\s*$).+")]],email:[null,[l.required,l.email,l.pattern("^(?!\\s*$).+")]],password:[null,[l.required,l.pattern("^(?!\\s*$).+")]],confirmPassword:[null,[l.required,l.pattern("^(?!\\s*$).+")]]},{validators:B})}onSubmit(){if(this.fg.invalid){this.fg.markAllAsTouched();return}let n={userName:this.fg.get("userName")?.value,email:this.fg.get("email")?.value,password:this.fg.get("password")?.value};this.authService.signUp(n).subscribe({next:t=>{this.toastr.success("Sign up successful","Success").onHidden.subscribe(()=>{this.router.navigate([""])})},error:t=>{let e=t.error.errors,d="";for(let h in e)e.hasOwnProperty(h)&&(d+=`${e[h].join(", ")}
`);this.toastr.error(d,t.error.title)}})}static{this.\u0275fac=function(t){return new(t||i)(u(_),u(x),u(F),u(R))}}static{this.\u0275cmp=b({type:i,selectors:[["app-sign-up"]],standalone:!0,features:[y],decls:32,vars:18,consts:[[1,"container-fluid","router-content","map-container"],[1,"row","h-100","flex-column"],[1,"col"],[1,"d-flex","align-items-center","justify-content-center","h-100"],[1,"card","shadow-lg","p-4",2,"width","500px","border-radius","20px"],[1,"card-body"],[1,"card-title","text-center","mb-4",2,"color","#007bff"],[3,"submit","formGroup"],[1,"form-group"],["for","userName"],["type","userName","id","userName","placeholder","enter your user name","formControlName","userName",1,"form-control",3,"maxlength","ngClass"],["for","email"],["type","email","id","email","placeholder","enter your email","formControlName","email",1,"form-control",3,"maxlength","ngClass"],[1,"form-group","mt-3"],["for","password"],["type","password","id","password","placeholder","Enter your password","formControlName","password",1,"form-control",3,"ngClass"],["for","confirm-password"],["type","password","id","confirm-password","placeholder","Enter your password","formControlName","confirmPassword",1,"form-control",3,"ngClass"],["type","submit",1,"btn","btn-primary","btn-block","btn-login","mt-4","w-100",3,"disabled"],[1,"text-center","mt-2"],[1,"text-primary",3,"routerLink"]],template:function(t,e){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h3",6),a(7," Sign Up "),r(),o(8,"form",7),w("submit",function(){return e.onSubmit()}),o(9,"div",8)(10,"label",9),a(11,"user name"),r(),p(12,"input",10),r(),o(13,"div",8)(14,"label",11),a(15,"Email"),r(),p(16,"input",12),r(),o(17,"div",13)(18,"label",14),a(19,"Password"),r(),p(20,"input",15),r(),o(21,"div",13)(22,"label",16),a(23,"Confirm Password"),r(),p(24,"input",17),r(),o(25,"button",18),a(26," Submit "),r()(),o(27,"div",19)(28,"span"),a(29,"Already have an account? "),r(),o(30,"a",20),a(31,"Sign In"),r()()()()()()()()),t&2&&(s(8),m("formGroup",e.fg),s(4),m("maxlength",250)("ngClass",c(9,V,e.fg.get("userName").invalid&&e.fg.get("userName").touched)),s(4),m("maxlength",250)("ngClass",c(11,V,e.fg.get("email").invalid&&e.fg.get("email").touched)),s(4),m("ngClass",c(13,V,e.fg.get("password").invalid&&e.fg.get("password").touched)),s(4),m("ngClass",c(15,V,e.fg.get("confirmPassword").invalid&&e.fg.get("confirmPassword").touched)),s(),m("disabled",e.fg.invalid),s(5),m("routerLink",C(17,Z)))},dependencies:[P,k,E,M,j,T,L,A,U,g,I,f,N]})}}return i})();var ee=[{path:"sign-up",component:H},{path:"",component:O},{path:"**",redirectTo:""}],z=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=S({type:i})}static{this.\u0275inj=v({imports:[f.forChild(ee),f]})}}return i})();var Se=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=S({type:i})}static{this.\u0275inj=v({imports:[g,z]})}}return i})();export{Se as AuthModule};
