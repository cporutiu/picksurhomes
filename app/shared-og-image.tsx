export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = "Picksur Homes — Private Mortgage Note Investing";

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 15% 15%, rgba(251,191,36,0.12), transparent 45%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            backgroundColor: "#fbbf24",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 32, fontWeight: 700, color: "#fafafa" }}>
          Picksur Homes
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.1,
          }}
        >
          Private debt. Collateral-backed yields.
        </div>
        <div style={{ fontSize: 26, color: "#a1a1aa", maxWidth: 820 }}>
          First-lien mortgage notes, brokered and serviced for private
          investors seeking stable, monthly income.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 32,
        }}
      >
        <div style={{ fontSize: 22, color: "#71717a", display: "flex" }}>
          quicknotedeals.com
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#fbbf24" }}>
              11.3%
            </div>
            <div style={{ fontSize: 16, color: "#71717a" }}>
              Annualized Return
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#fafafa" }}>
              14
            </div>
            <div style={{ fontSize: 16, color: "#71717a" }}>
              States Covered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
