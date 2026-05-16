import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-7">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-11">
          <div>
            <div className="flex flex-col items-start gap-0.5 mb-4">
              <div className="border-[2.5px] border-primary px-3 py-1 relative before:content-[''] before:absolute before:left-[-4px] before:top-[-4px] before:w-1 before:h-[calc(100%+8px)] before:bg-primary">
                <span className="font-bold text-xl tracking-wide bg-gradient-to-br from-[#8a8fa8] via-[#6b7080] to-[#8a8fa8] bg-clip-text text-transparent">
                  Urban Deal
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-[0.3em] text-[#8a8fa8]">U-DEAL</span>
            </div>
            <p className="text-xs text-[var(--fg3)] leading-7">
              პრემიუმ სნიკერები და სტრიტვეარი ევროპიდან. ორიგინალი, გარანტიით.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              ნავიგაცია
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/" className="text-[13px] text-[var(--fg3)] hover:text-primary transition-colors">
                  მთავარი
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[13px] text-[var(--fg3)] hover:text-primary transition-colors">
                  პროდუქტები
                </Link>
              </li>
              <li>
                <Link href="/preorder" className="text-[13px] text-[var(--fg3)] hover:text-primary transition-colors">
                  პრი-ორდერი
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-[var(--fg3)] hover:text-primary transition-colors">
                  კონტაქტი
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              კონტაქტი
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li className="text-[13px] text-[var(--fg3)]">
                <a href="tel:+995592013611" className="hover:text-primary transition-colors">+995 592 01 36 11</a>
              </li>
              <li className="text-[13px] text-[var(--fg3)]">
                <a href="mailto:shop.udeal@gmail.com" className="hover:text-primary transition-colors">shop.udeal@gmail.com</a>
              </li>
              <li className="text-[13px] text-[var(--fg3)]">
                <a href="https://instagram.com/urbandeal_" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@urbandeal_</a>
              </li>
              <li className="text-[13px] text-[var(--fg3)]">
                <a href="https://www.facebook.com/profile.php?id=61577061391179" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>
              </li>
              <li className="text-[13px] text-[var(--fg3)]">
                <a href="https://tiktok.com/@urabandeal" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              ინფორმაცია
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li className="text-[13px] text-[var(--fg3)]">თბილისი, საქართველო</li>
              <li className="text-[13px] text-[var(--fg3)]">ყოველდღე ღია</li>
              <li className="text-[13px] text-[var(--fg3)]">100% ორიგინალი</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-5 text-center text-[11px] text-[var(--fg3)] tracking-wide">
          © 2025 <span className="text-primary">Urban Deal</span>. ყველა უფლება დაცულია. | U-DEAL
        </div>
      </div>
    </footer>
  )
}
