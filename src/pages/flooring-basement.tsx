import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { getStoredColorMode, toggleColorMode, type ColorMode, type ThemeKey } from "@/lib/themes"
import { useState } from "react"

export default function FlooringBasementPage() {
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

  const calculationBoxStyle = {
    background: "linear-gradient(135deg, oklch(0.65 0.15 145 / 0.1) 0%, oklch(0.65 0.15 145 / 0.05) 100%)",
    border: "2px solid oklch(0.65 0.15 145 / 0.2)",
    padding: "32px",
    borderRadius: "16px",
    textAlign: "center" as const,
  }

  const warningBoxStyle = {
    background: "oklch(0.65 0.15 45 / 0.1)",
    borderLeft: "3px solid oklch(0.65 0.15 45)",
    padding: "16px",
    borderRadius: "8px",
  }

  const orangeCalculationBoxStyle = {
    ...calculationBoxStyle,
    background: "oklch(0.65 0.15 45 / 0.1)",
    border: "2px solid oklch(0.65 0.15 45 / 0.2)",
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Animated background mesh */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Navigation */}
      <nav className="flex-shrink-0 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 group"
              >
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

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted px-3 py-2 rounded-lg text-sm font-medium"
              >
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

      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 mb-5">
            🏠 Home & Renovation
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Basement Flooring Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tennessee Bluegrass LVP for 311 sq ft multi-purpose room
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border/50 shadow-lg p-8 sm:p-12">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📋 Project Overview
              </h2>
              <div style={highlightBoxStyle}>
                <p><strong>Location:</strong> Basement<br />
                <strong>Size:</strong> 311 square feet<br />
                <strong>Use:</strong> Craft Room + Exercise Room<br />
                <strong>Product:</strong> Tennessee Bluegrass by Drop & Done Flooring<br />
                <strong>Status:</strong> Planning Phase</p>
              </div>
            </section>

            {/* Specifications */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏆 Product Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-card border border-border/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">20 mil</div>
                  <div className="text-xs text-muted-foreground">Wear Layer</div>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">IIC 54</div>
                  <div className="text-xs text-muted-foreground">Acoustic Rating</div>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">Lifetime</div>
                  <div className="text-xs text-muted-foreground">Residential Warranty</div>
                </div>
                <div className="bg-card border border-border/50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-primary mb-1">15 Years</div>
                  <div className="text-xs text-muted-foreground">Commercial Warranty</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3">Why This Flooring?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Acoustic Backing:</strong> Absorbs sound and feels nicer underfoot — perfect for basement concrete</li>
                <li><strong>20 mil Wear Layer:</strong> Commercial-grade durability handles exercise equipment and craft activities</li>
                <li><strong>Moisture Resistant:</strong> Essential for basement installations</li>
                <li><strong>Easy Maintenance:</strong> Wipes clean from craft spills and sweat</li>
              </ul>
            </section>

            {/* Material Calculation */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📊 Material Calculation
              </h2>

              <div style={calculationBoxStyle}>
                <div className="text-5xl font-extrabold text-green-500 mb-2">342 sq ft</div>
                <div className="text-sm text-muted-foreground">
                  Total Flooring Needed<br />(311 sq ft + 10% overage)
                </div>
              </div>

              <div style={highlightBoxStyle} className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Package Details:</h3>
                <ul className="space-y-1 text-sm">
                  <li><strong>Coverage per box:</strong> 20 sq ft</li>
                  <li><strong>Boxes needed:</strong> 18 boxes (360 sq ft total)</li>
                  <li><strong>Pallet size:</strong> 60 boxes (full pallet available)</li>
                  <li><strong>Extra for future repairs:</strong> 2-3 boxes recommended</li>
                </ul>
              </div>

              <div style={warningBoxStyle} className="mt-6">
                <p>⚠️ <strong>Important:</strong> The room shape is irregular/L-shaped. Plan your layout to minimize cuts and ensure you order sufficient material for the complex angles.</p>
              </div>
            </section>

            {/* Room Zones */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🎯 Room Zones
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">🎨 Craft Area</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>Worktables and chairs</li>
                    <li>Storage for supplies</li>
                    <li>Standing work areas</li>
                    <li>The 20 mil wear layer resists scratches from tools and chair wheels</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">💪 Exercise Area</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>Treadmill placement</li>
                    <li>Free weight zone</li>
                    <li>Stretching/yoga space</li>
                    <li>The acoustic backing reduces equipment noise</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Equipment & Accessories */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🛡️ Required Equipment & Accessories
              </h2>

              <h3 className="text-lg font-semibold mb-4">Protective Mats (Essential)</h3>

              <div className="space-y-3 mb-6">
                <div className="bg-muted rounded-xl p-5 border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">🏃 Treadmill Mat — $40-80</h4>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Specs:</strong> 1/4&quot; - 3/8&quot; PVC or rubber, at least 3&quot; larger than treadmill on all sides</p>
                  <p className="text-sm text-muted-foreground"><strong>Why:</strong> Concentrated treadmill weight (200+ lbs) on 4 feet causes indentations without protection</p>
                </div>

                <div className="bg-muted rounded-xl p-5 border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">🏋️ Weight Area Rubber Mats — $36-108</h4>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Specs:</strong> 3/8&quot; - 3/4&quot; thick, 6&apos;×6&apos; minimum, interlocking puzzle mats or roll-out rubber</p>
                  <p className="text-sm text-muted-foreground"><strong>Why:</strong> Dropping weights can damage LVP; rubber protects flooring and reduces noise</p>
                </div>

                <div className="bg-muted rounded-xl p-5 border-l-4 border-primary">
                  <h4 className="font-semibold mb-2">🧘 Yoga/Stretching Mat — $20-100 (Optional)</h4>
                  <p className="text-sm text-muted-foreground mb-1"><strong>Specs:</strong> 1/4&quot; thick, portable</p>
                  <p className="text-sm text-muted-foreground"><strong>Why:</strong> Since flooring already has acoustic backing, can go thinner here</p>
                </div>
              </div>

              <div style={orangeCalculationBoxStyle}>
                <div className="text-4xl font-extrabold text-orange-500 mb-2">$100-250</div>
                <div className="text-sm text-muted-foreground">
                  Total Mat Investment<br />(Protects your flooring investment)
                </div>
              </div>
            </section>

            {/* Installation Notes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🔧 Installation Notes
              </h2>

              <h3 className="text-lg font-semibold mb-3">Critical Pre-Installation Steps</h3>
              <ol className="space-y-2 text-muted-foreground list-decimal list-inside ml-6">
                <li><strong>Subfloor Prep:</strong> Ensure concrete is clean, dry, and level. LVP requires flat surfaces.</li>
                <li><strong>Moisture Test:</strong> Check concrete moisture levels before installation.</li>
                <li><strong>Acclimate Flooring:</strong> Store boxes in the room for 48 hours before installation.</li>
                <li><strong>Layout Planning:</strong> Dry-lay planks first to plan cuts around the irregular room shape.</li>
                <li><strong>Expansion Gap:</strong> Leave 1/4&quot; gap around all walls for expansion/contraction.</li>
              </ol>

              <div style={warningBoxStyle} className="mt-6">
                <p>⚠️ <strong>Flooring Inspector Note:</strong> Uneven subfloors cause planks to lift and create excessive wear on high spots. Sand down any high spots or fill low spots before installation.</p>
              </div>
            </section>

            {/* Budget */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                💰 Estimated Budget
              </h2>
              <div className="bg-muted rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4">Tennessee Bluegrass Flooring (18 boxes)</td>
                      <td className="p-4 text-right">$TBD</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Treadmill Mat</td>
                      <td className="p-4 text-right">$40-80</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Weight Area Mats</td>
                      <td className="p-4 text-right">$36-108</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Underlayment (if needed)</td>
                      <td className="p-4 text-right">$TBD</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4">Installation Supplies</td>
                      <td className="p-4 text-right">$50-100</td>
                    </tr>
                    <tr className="font-bold">
                      <td className="p-4">Total Project Estimate</td>
                      <td className="p-4 text-right">$TBD + Flooring Cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Next Steps */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                ✅ Next Steps
              </h2>
              <ol className="space-y-2 text-muted-foreground list-decimal list-inside ml-6">
                <li>Confirm flooring price and availability with XL Flooring</li>
                <li>Order treadmill and weight mats in advance</li>
                <li>Prepare subfloor (clean, level, moisture test)</li>
                <li>Order flooring with 10-15% overage</li>
                <li>Acclimate flooring for 48 hours</li>
                <li>Plan layout for irregular room shape</li>
                <li>Install flooring</li>
                <li>Place protective mats before moving equipment in</li>
              </ol>
            </section>

            {/* Why Perfect */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🌟 Why Tennessee Bluegrass is Perfect for This Project
              </h2>
              <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span>✓</span><span><strong>Acoustic backing</strong> makes the basement feel warmer and quieter</span></li>
                  <li className="flex gap-2"><span>✓</span><span><strong>20 mil wear layer</strong> handles both craft activities and exercise equipment</span></li>
                  <li className="flex gap-2"><span>✓</span><span><strong>Moisture resistance</strong> protects against basement humidity</span></li>
                  <li className="flex gap-2"><span>✓</span><span><strong>Lifetime warranty</strong> shows manufacturer confidence</span></li>
                  <li className="flex gap-2"><span>✓</span><span><strong>Easy DIY installation</strong> with Drop & Done loose-lay system</span></li>
                  <li className="flex gap-2"><span>✓</span><span><strong>Easy maintenance</strong> for multi-purpose use</span></li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Generated by Clawdbot AI Assistant • Basement Flooring Plan • January 30, 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
