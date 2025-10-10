<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if(auth()->check() && auth()->user()->role == $role) {
            return $next($request);
        }

        if(auth()->check()){
            if(auth()->user()->role == 1){
                 return redirect()->route('dashboard');
            }elseif(auth()->user()->role == 2){
                return redirect()->route('services');
            }
        }

         return redirect()->route('login');
    }
}
