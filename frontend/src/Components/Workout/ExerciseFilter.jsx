const ExerciseFilter = ({
  appliedFilters,
  setAppliedFilters,
  applyFilters,
  searchTerm,
  setSearchTerm,
}) => {
  const handleApplyClick = () => {
    applyFilters();
  };

  const handleResetClick = () => {
    setAppliedFilters({
      equipment: "",
      muscle: "",
    });
    setSearchTerm(""); // Reset the search term
    applyFilters();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="fliter-form">
      <div className="fliterby">Filter by:</div>
      <label>
        Search:
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </label>
      <label>
        Equipment:
        <select
          value={appliedFilters.equipment}
          onChange={(e) =>
            setAppliedFilters({
              ...appliedFilters,
              equipment: e.target.value,
            })
          }
        >
          <option value=""></option>
          <option value="barbell">Barbell</option>
          <option value="dumbbell">Dumbbell</option>
          <option value="bodyweight">Bodyweight</option>
          <option value="machine">Machine</option>
          <option value="kettlebell">Kettlebell</option>
          <option value="cables">Cables</option>
          <option value="band">Band</option>
        </select>
      </label>
      <label>
        Muscle:
        <select
          value={appliedFilters.muscle}
          onChange={(e) =>
            setAppliedFilters({
              ...appliedFilters,
              muscle: e.target.value,
            })
          }
        >
          <option value=""></option>
          <option value="legs">Legs</option>
          <option value="core">Core</option>
          <option value="arms">Arms</option>
          <option value="chest">Chest</option>
          <option value="shoulders">Shoulders</option>
          <option value="full body">Full Body</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="back">Back</option>
        </select>
      </label>
      <div>
        <button id="apply-btn" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ExerciseFilter;
