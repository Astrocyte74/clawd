import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { getStoredColorMode, toggleColorMode, type ColorMode, type ThemeKey } from "@/lib/themes"
import { useState } from "react"

export default function TofuRecipes() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("clawd")
  const currentMode = getStoredColorMode()

  const handleModeChange = (_mode: ColorMode) => {
    toggleColorMode()
  }

  const highlightBoxStyle = {
    background: "var(--muted)",
    borderLeft: "3px solid var(--primary)",
    padding: "20px",
    borderRadius: "8px",
  }

  const tipBoxStyle = {
    background: "linear-gradient(135deg, oklch(0.65 0.15 145 / 0.1) 0%, oklch(0.65 0.15 145 / 0.05) 100%)",
    border: "2px solid oklch(0.65 0.15 145 / 0.2)",
    padding: "24px",
    borderRadius: "12px",
  }

  const recipes = [
    {
      name: "Crispy Maple-Sriracha Tofu",
      time: "30 mins",
      difficulty: "Easy",
      description: "Sweet, spicy, and perfectly crispy - this will convert any tofu skeptic!",
      ingredients: [
        "1 block (14 oz) extra-firm tofu, pressed and cubed",
        "2 tbsp maple syrup",
        "1 tbsp Sriracha (adjust to taste)",
        "1 tbsp soy sauce",
        "1 tbsp cornstarch",
        "2 tbsp vegetable oil",
        "1 tsp sesame seeds",
        "Green onions, chopped (for garnish)"
      ],
      instructions: [
        "Press tofu for 15 minutes to remove excess water, then cut into 1-inch cubes",
        "In a small bowl, whisk together maple syrup, Sriracha, and soy sauce",
        "Toss tofu cubes in cornstarch until evenly coated",
        "Heat oil in a large skillet over medium-high heat",
        "Add tofu in a single layer (cook in batches if needed) - don't crowd the pan!",
        "Fry for 3-4 minutes per side until golden and crispy",
        "Reduce heat to low, pour sauce over tofu, and toss until coated and sticky",
        "Garnish with sesame seeds and green onions",
        "Serve over rice with steamed broccoli"
      ],
      tips: "For extra crispiness, freeze the tofu block overnight, then thaw and press before cooking. This creates a spongier texture that absorbs more flavor!"
    },
    {
      name: "Korean BBQ Tofu Bowls",
      time: "35 mins",
      difficulty: "Medium",
      description: "Sweet and savory Korean-inspired tofu with pickled vegetables and fluffy rice.",
      ingredients: [
        "1 block extra-firm tofu, pressed and sliced into slabs",
        "3 tbsp gochujang (Korean chili paste)",
        "2 tbsp soy sauce",
        "1 tbsp rice vinegar",
        "1 tbsp sesame oil",
        "1 tbsp brown sugar",
        "2 cloves garlic, minced",
        "1 tsp fresh ginger, grated",
        "Cooked rice for serving",
        "Pickled cucumbers and carrots",
        "Sesame seeds and nori strips for garnish"
      ],
      instructions: [
        "Press tofu for 15 minutes, then slice into 1/2-inch thick slabs",
        "Whisk together gochujang, soy sauce, vinegar, sesame oil, brown sugar, garlic, and ginger",
        "Marinate tofu slabs in the mixture for at least 20 minutes (up to overnight)",
        "Heat oil in a skillet over medium-high heat",
        "Cook tofu for 3-4 minutes per side until charred edges form",
        "Brush with remaining marinade while cooking",
        "Serve over rice with pickled vegetables on top",
        "Garnish with sesame seeds and nori strips"
      ],
      tips: "The longer you marinate, the better! If you have time, let it sit overnight in the fridge for maximum flavor penetration."
    },
    {
      name: "Creamy Coconut Curry Tofu",
      time: "40 mins",
      difficulty: "Easy",
      description: "Rich and aromatic Thai-inspired curry with silky tofu and vegetables.",
      ingredients: [
        "1 block extra-firm tofu, pressed and cubed",
        "1 can (13.5 oz) full-fat coconut milk",
        "2 tbsp red curry paste",
        "1 bell pepper, sliced",
        "1 cup baby corn or bamboo shoots",
        "1 cup spinach",
        "1 tbsp soy sauce",
        "1 tbsp brown sugar",
        "Fresh basil and cilantro for garnish",
        "Jasmine rice for serving"
      ],
      instructions: [
        "Press tofu and cut into cubes",
        "Heat a large pot or wok over medium-high heat",
        "Fry tofu cubes in oil until golden on all sides, about 5 minutes. Remove and set aside",
        "In the same pot, add 2 tablespoons of coconut milk (the thick cream from the top)",
        "Add curry paste and stir until fragrant, about 1-2 minutes",
        "Pour in remaining coconut milk, soy sauce, and brown sugar",
        "Add bell peppers and baby corn, simmer for 5 minutes",
        "Add tofu and spinach, cook for 2 more minutes",
        "Serve over jasmine rice, garnished with fresh basil and cilantro"
      ],
      tips: "Use full-fat coconut milk for the richest flavor. Light coconut milk can make the curry thin and less satisfying."
    },
    {
      name: "Smoked Tofu BLT Sandwich",
      time: "20 mins",
      difficulty: "Easy",
      description: "Smoky, crispy tofu strips with all the classic BLT fixings.",
      ingredients: [
        "1 block smoked tofu (or extra-firm with liquid smoke)",
        "4 slices sandwich bread",
        "2 tbsp olive oil",
        "1 tbsp soy sauce",
        "1 tsp smoked paprika",
        "Lettuce (romaine or butter)",
        "2-3 tomatoes, sliced",
        "Vegan mayonnaise",
        "Avocado (optional but recommended)"
      ],
      instructions: [
        "Slice smoked tofu into thin strips lengthwise",
        "If using plain tofu, marinate strips in soy sauce, liquid smoke, and smoked paprika for 10 minutes",
        "Heat olive oil in a skillet over medium-high heat",
        "Fry tofu strips until crispy and golden on edges, about 3-4 minutes per side",
        "Toast bread slices until golden",
        "Assemble sandwiches: mayo on bread, lettuce, tomato slices, crispy tofu, avocado",
        "Slice diagonally and serve immediately"
      ],
      tips: "Smoked tofu is a game-changer! Look for it at health food stores or Asian markets. It has a rich, smoky flavor that mimics bacon perfectly."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Animated background mesh */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Navigation */}
      <nav className="flex-shrink-0 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-primary-foreground transition-all duration-300 group-hover:scale-105 group-hover:rotate-12"
                  style={{ backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--primary) / 0.6)` }}
                >
                  <span className="font-bold text-sm">C</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Clawd Hub</div>
                  <div className="text-xs text-muted-foreground">AI-Powered Projects</div>
                </div>
              </Link>

              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted px-3 py-2 rounded-lg text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                currentMode={currentMode}
                onModeChange={handleModeChange}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">🥢</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Creative Tofu Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delicious, protein-packed recipes that will make you forget you're eating tofu. From crispy Asian-inspired dishes to comfort food classics.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              🌱 Plant-Based
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              💪 High Protein
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              ⏱️ 20-40 Mins
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tips Section */}
          <div className="max-w-4xl mx-auto mb-12" style={tipBoxStyle}>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              💡 Pro Tips for Perfect Tofu
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Always press your tofu:</strong> Use a tofu press or wrap in towels and weight with heavy cans for 15-30 minutes</li>
              <li>• <strong>Freeze for better texture:</strong> Freezing changes the structure, making it spongier and more absorbent</li>
              <li>• <strong>Don't crowd the pan:</strong> When pan-frying, give the tofu space so it gets crispy, not steamed</li>
              <li>• <strong>Cornstarch is your friend:</strong> Coating in cornstarch before frying creates that irresistible crispy exterior</li>
            </ul>
          </div>

          {/* Recipes Grid */}
          <div className="space-y-16">
            {recipes.map((recipe, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                <div className="bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                  {/* Recipe Header */}
                  <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 p-6 sm:p-8 border-b border-border/50">
                    <h2 className="text-3xl font-bold mb-2">{recipe.name}</h2>
                    <p className="text-muted-foreground mb-4">{recipe.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 text-sm">
                        ⏱️ {recipe.time}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm">
                        📊 {recipe.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="p-6 sm:p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Ingredients */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          🧺 Ingredients
                        </h3>
                        <ul className="space-y-2">
                          {recipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-muted-foreground">{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          👨‍🍳 Instructions
                        </h3>
                        <ol className="space-y-3">
                          {recipe.instructions.map((instruction, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                                {i + 1}
                              </span>
                              <span className="text-muted-foreground pt-0.5">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    {recipe.tips && (
                      <div className="mt-6" style={highlightBoxStyle}>
                        <strong className="text-primary">💡 Pro Tip:</strong> {recipe.tips}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-border/50">
              <h3 className="text-2xl font-bold mb-3">Love These Recipes?</h3>
              <p className="text-muted-foreground mb-6">
                Experiment with different sauces, vegetables, and spices to make these recipes your own!
              </p>
              <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Generated by Clawdbot AI Assistant • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  )
}
