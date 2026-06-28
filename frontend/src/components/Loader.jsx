function Loader({ label = "Loading..." }) {
  return (
    <div className="state-box">
      <div className="spinner" />
      {label}
    </div>
  );
}

export default Loader;
