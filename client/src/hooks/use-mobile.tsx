import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // أنشئ media query listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // set once initially
    updateIsMobile()

    // استخدم addEventListener لو متاح وإلا fallback لـ addListener (دعم المتصفحات الأقدم)
    if (mql.addEventListener) {
      mql.addEventListener("change", updateIsMobile)
    } else {
      mql.addListener(updateIsMobile)
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", updateIsMobile)
      } else {
        mql.removeListener(updateIsMobile)
      }
    }
  }, [])

  // ارجع false بشكل مؤقت بدل undefined لتجنب flickering
  return isMobile ?? false
}
