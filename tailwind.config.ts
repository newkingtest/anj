import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				celebration: {
					DEFAULT: 'hsl(var(--celebration))',
					foreground: 'hsl(var(--celebration-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pulse-glow': {
					'0%': { boxShadow: 'var(--glow-primary)' },
					'100%': { boxShadow: 'var(--glow-secondary), var(--glow-accent)' }
				},
				'particle-float': {
					'0%': {
						transform: 'translateY(100vh) translateX(0)',
						opacity: '0'
					},
					'10%': {
						opacity: '0.7'
					},
					'90%': {
						opacity: '0.7'
					},
					'100%': {
						transform: 'translateY(-10vh) translateX(100px)',
						opacity: '0'
					}
				},
				'confetti-fall': {
					'0%': {
						transform: 'translateY(-100vh) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh) rotate(360deg)',
						opacity: '0'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'balloon-float': {
					'0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
					'50%': { transform: 'translateY(-15px) rotate(2deg)' }
				},
				'balloon-swing': {
					'0%, 100%': { transform: 'rotate(-5deg) translateY(0)' },
					'50%': { transform: 'rotate(5deg) translateY(-8px)' }
				},
				'balloon-wobble': {
					'0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateX(-3px) translateY(-5px) rotate(-1deg)' },
					'75%': { transform: 'translateX(3px) translateY(-10px) rotate(1deg)' }
				},
				'balloon-pulse': {
					'0%, 100%': { transform: 'scale(1) translateY(0)' },
					'50%': { transform: 'scale(1.05) translateY(-8px)' }
				},
				'balloon-dance': {
					'0%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-12px) rotate(-3deg)' },
					'50%': { transform: 'translateY(-5px) rotate(0deg)' },
					'75%': { transform: 'translateY(-15px) rotate(3deg)' },
					'100%': { transform: 'translateY(0) rotate(0deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'particle-float': 'particle-float 8s linear infinite',
				'confetti-fall': 'confetti-fall 3s linear infinite',
				'scale-in': 'scale-in 0.2s ease-out',
				'balloon-float': 'balloon-float 3s ease-in-out infinite',
				'balloon-swing': 'balloon-swing 2.5s ease-in-out infinite',
				'balloon-wobble': 'balloon-wobble 4s ease-in-out infinite',
				'balloon-pulse': 'balloon-pulse 2s ease-in-out infinite',
				'balloon-dance': 'balloon-dance 3.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
