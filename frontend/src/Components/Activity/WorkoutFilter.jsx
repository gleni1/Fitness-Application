const WorkoutFilter = ({ appliedFilters, setAppliedFilters, applyFilters }) => {
  const handleApplyClick = () => {
    applyFilters();
  };

  const handleResetClick = () => {
    setAppliedFilters({
      equipment: "",
      difficulty: "",
      goal: "",
      muscle: "",
    });
    applyFilters();
  };

  return (
    <div className="fliter-form">
      <div className="fliterby">Filter by:</div>
      <label>
        Equipment:{" "}
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
        Difficulty:{" "}
        <select
          value={appliedFilters.difficulty}
          onChange={(e) =>
            setAppliedFilters({
              ...appliedFilters,
              difficulty: e.target.value,
            })
          }
        >
          <option value=""></option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      <label>
        Goal:{" "}
        <select
          value={appliedFilters.goal}
          onChange={(e) =>
            setAppliedFilters({
              ...appliedFilters,
              goal: e.target.value,
            })
          }
        >
          <option value=""></option>
          <option value="lose weight">Lose Weight</option>
          <option value="gain muscle">Gain Muscle</option>
          <option value="improve endurance">Improve Endurance</option>
          <option value="enhance flexibility">Enhance Flexibility</option>
        </select>
      </label>
      <label>
        Muscle:{" "}
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
        <button id="apply-btn" onClick={handleApplyClick}>
          Apply
        </button>
        <button id="apply-btn" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default WorkoutFilter;
