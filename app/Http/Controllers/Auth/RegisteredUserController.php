    <?php

    namespace App\Http\Controllers\Auth;

    use App\Http\Controllers\Controller;
    use App\Models\User;
    use Illuminate\Auth\Events\Registered;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\Rules;
    use Inertia\Inertia;
    use Inertia\Response;

    class RegisteredUserController extends Controller
    {
        /**
         * Display the registration view.
         */
        public function create(): Response
        {
            return Inertia::render('Auth/Register');
        }

        /**
         * Handle an incoming registration request.
         *
         * @throws \Illuminate\Validation\ValidationException
         */
        public function store(Request $request): RedirectResponse
        {
            $request->validate([
                'firstname' => 'required|string|max:255',
                'middlename' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'contact_number' => 'required|string|max:255',
                'address' => 'required|string|max:255',
                // 'company_or_organization' =>'required|string|max:255',
                // 'preferred_contact_method' => 'required|string|max:255',
                // 'role' => 'required|string|max:255',
                // 'terms_and_condition_concent' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'firstname' => $request->firstname,
                'middlename' => $request->middlename,
                'lastname'=> $request->lastname,
                'contact_number' => $request-> contact_number,
                'address' => $request->address,
                // 'preferred_contact_method' => $request->preferred_contact_method,
                // 'company_or_organization' => $request->company_or_organization,
                // 'role' => $request-> role,
                // 'terms_and_condition_concent' => $request->terms_and_condition_concent,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            event(new Registered($user));

            Auth::login($user);

            return redirect(route('dashboard', absolute: false));
        }
    }
