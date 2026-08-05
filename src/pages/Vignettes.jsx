export default function Vignettes() {
  return (
    <div className="vignettes">
      <h1>Vignettes</h1>
      <p>
        This is the Vignettes page. You can add your vignettes content here.
      </p>
      <iframe
        src="/bdm/quarto/test.html"
        title="Vignette"
        style={{ width: "100%", height: "80vh", border: "none" }}
      />
    </div>
  );
}
