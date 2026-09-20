import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, Sparkles, Target, Bell, Award } from "lucide-react";
import { toast } from "sonner";

const benefits = [
	{ icon: Sparkles, text: "Score de matching IA gratuit" },
	{ icon: Target, text: "Optimisation CV automatique" },
	{ icon: Bell, text: "Alertes emploi personnalisées" },
	{ icon: Award, text: "Accès aux formations" },
];

const Signup = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Vérification côté client
		if (password !== confirmPassword) {
			toast.error("Les mots de passe ne correspondent pas.");
			setIsLoading(false);
			return;
		}

		try {
			// Appel à l'API backend (passer par le gateway si besoin)
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
					confirmPassword,
				}),
			});

			if (!response.ok) {
				let errorMessage = "Erreur lors de l'inscription";
				try {
					const errorData = await response.json();
					if (errorData && errorData.message) errorMessage = errorData.message;
				} catch {
					// réponse non JSON
				}
				throw new Error(errorMessage);
			}

			const data = await response.json();

			// Stocker le token si renvoyé
			if (data && data.token) {
				localStorage.setItem("auth_token", data.token);
				localStorage.setItem("auth_token_type", data.tokenType || "Bearer");
			}

			toast.success("Compte créé ! Choisissez maintenant votre profil.");
			navigate("/select-role");
		} catch (error: any) {
			toast.error(error.message || "Erreur lors de l'inscription");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white dark:bg-slate-900 flex">
			{/* Left Side - Branding & Benefits */}
			<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
				{/* Background Pattern */}
				<div className="absolute inset-0" style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}} />
				
				{/* Content */}
				<div className="relative z-10 flex flex-col justify-between p-12 text-slate-900 dark:text-white">
					<div>
						{/* Logo */}
						<Link to="/" className="inline-flex items-center gap-4 group">
							<div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
								<img 
									src="/logo.png" 
									alt="ForsaTech" 
									className="w-16 h-16 object-contain"
								/>
							</div>
							<span className="text-3xl font-bold">ForsaTech</span>
						</Link>
					</div>

					<div className="space-y-8">
						<div>
							<h2 className="text-4xl font-bold mb-4 leading-tight text-slate-900 dark:text-white">
								Lancez votre carrière <br />
								<span className="text-slate-700 dark:text-slate-300">avec l'IA</span>
							</h2>
							<p className="text-slate-600 dark:text-slate-400 text-lg">
								Rejoignez des milliers de professionnels qui ont trouvé leur opportunité
							</p>
						</div>

						{/* Benefits */}
						<div className="space-y-4">
							{benefits.map((benefit, index) => {
								const Icon = benefit.icon;
								return (
									<div 
										key={index} 
										className="flex items-center gap-3 animate-fade-in"
										style={{ animationDelay: `${index * 100}ms` }}
									>
										<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
											<Icon className="w-5 h-5 text-primary" />
										</div>
										<span className="text-slate-700 dark:text-slate-300 text-base">{benefit.text}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-3 gap-6">
						<div>
							<div className="text-3xl font-bold text-slate-900 dark:text-white">50K+</div>
							<div className="text-slate-600 dark:text-slate-400 text-sm">Utilisateurs</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-slate-900 dark:text-white">2K+</div>
							<div className="text-slate-600 dark:text-slate-400 text-sm">Entreprises</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-slate-900 dark:text-white">98%</div>
							<div className="text-slate-600 dark:text-slate-400 text-sm">Satisfaction</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Signup Form */}
			<div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
				<div className="w-full max-w-md space-y-8">
					{/* Mobile Logo */}
					<Link to="/" className="lg:hidden flex items-center justify-center gap-4 mb-8">
						<div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-lg flex items-center justify-center">
							<img 
								src="/logo.png" 
								alt="ForsaTech" 
								className="w-16 h-16 object-contain"
							/>
						</div>
						<span className="text-3xl font-bold text-slate-900 dark:text-white">ForsaTech</span>
					</Link>

					{/* Signup Card */}
					<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 animate-fade-in">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold text-foreground mb-2">
								Créez votre compte
							</h1>
							<p className="text-muted-foreground">
								Gratuit et sans engagement
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="grid sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-foreground mb-2">
										Prénom
									</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
										<Input
											placeholder="Prénom"
											required
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											className="pl-10 h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary transition-colors"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-foreground mb-2">
										Nom
									</label>
									<Input
										placeholder="Nom"
										required
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary transition-colors"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Adresse email
								</label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
									<Input
										type="email"
										placeholder="votre@email.com"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10 h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary transition-colors"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Mot de passe
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="Min. 6 caractères"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10 pr-12 h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary transition-colors"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									>
										{showPassword ? (
											<EyeOff className="w-5 h-5" />
										) : (
											<Eye className="w-5 h-5" />
										)}
									</button>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Confirmer le mot de passe
								</label>
								<Input
									type="password"
									placeholder="Confirmez le mot de passe"
									required
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="h-12 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary transition-colors"
								/>
							</div>

							<Button
								type="submit"
								size="lg"
								className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Création...
									</>
								) : (
									<>
										Créer mon compte gratuit
										<ArrowRight className="w-5 h-5 ml-2" />
									</>
								)}
							</Button>

							<p className="text-xs text-center text-muted-foreground">
								En créant un compte, vous acceptez nos{" "}
								<a
									href="#"
									className="text-primary hover:underline"
								>
									Conditions d'utilisation
								</a>
								{" "}et notre{" "}
								<a
									href="#"
									className="text-primary hover:underline"
								>
									Politique de confidentialité
								</a>
							</p>
						</form>

						{/* Divider */}
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-4 bg-white dark:bg-slate-800 text-muted-foreground">
									Déjà inscrit ?
								</span>
							</div>
						</div>

						{/* Login link */}
						<Link to="/login">
							<Button 
								type="button" 
								variant="outline" 
								size="lg"
								className="w-full h-12 text-base font-semibold border-2 hover:bg-primary/5 transition-all"
							>
								Se connecter
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
