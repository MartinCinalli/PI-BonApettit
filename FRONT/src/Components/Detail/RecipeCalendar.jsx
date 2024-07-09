import { useEffect, useState } from "react";
import { useContextGlobal } from "../../Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const RecipeCalendar = () => {

  const { state: { recipeSelected, plannedWeeks }, moveRecipe } = useContextGlobal()
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("isoWeek"));
  const [week, setWeek] = useState([
    { day: "L", selected: false },
    { day: "M", selected: false },
    { day: "M", selected: false },
    { day: "J", selected: false },
    { day: "V", selected: false },
    { day: "S", selected: false },
    { day: "D", selected: false },
  ])
  
  const getDatesForWeek = (weekStart) => week.map((_, index) => weekStart.add(index, "day"));
  const dates = getDatesForWeek(currentWeek);
  const currentWeekStr = currentWeek.format("YYYY-MM-DD");

  useEffect(() => {
    isRecipePlanned(recipeSelected.id)
  }, [recipeSelected])

  const isRecipePlanned = ( recipeId ) => {
    const semanaActual = Object.values(plannedWeeks[currentWeekStr])
    
    const newWeek = week.map( (day, i) => {
      const dia = Object.values(semanaActual[i])
      const momentoComida = dia.some( comida => comida?.id === recipeId )
      return {...day, selected: momentoComida}
    } );

    setWeek(newWeek)
  };

  const handleDayClick = ( selectedDay, selectedIndex ) => {
    const newWeek = week.map( (day, i) => day.day === selectedDay && i === selectedIndex ? { ...day, selected: !day.selected } : day );
    setWeek(newWeek)
  }

  const navigate = useNavigate();

  const handleSave = () =>{
    if(window.confirm('¿Desea guardar esta receta en el calendario?')){
      dates.map( (day, i) => {
        if( week[i].selected ) moveRecipe(day, recipeSelected.categorias[0].categorias, recipeSelected)
        const dia = Object.values(plannedWeeks[currentWeekStr])[i]
        const recetaAgendada = Object.values(dia).some( savedRecipe => savedRecipe?.id === recipeSelected.id )
        if( !week[i].selected && recetaAgendada) moveRecipe(day, recipeSelected.categorias[0].categorias, null)
      })

      toast.success(
        <div>
          <p>Se guardó exitosamente la receta en el calendario semanal</p>
          <br />
          <button onClick={() => navigate(`/planificador`)}>Ir al calendario</button>
        </div>
      );
    }
  }

  return (
    <div className="calendar">
      <ToastContainer/>
      <h4>¿QUIERES AGENDARLO?</h4>
      <div className="week-container">
        {week.map((diaSemana, i) => (
          <div
            key={i}
            className="week-day"
            style={{ backgroundColor: diaSemana.selected ? "var(--colorFondo-hueso)" : "grey", color: diaSemana.selected ? "var(--colorFuente-bordo)": "var(--colorFondo-hueso)", fontWeight: "600"}}
            onClick={() => handleDayClick(diaSemana.day, i)}
          >
            {diaSemana.day}
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="navbar-button btn-login btn-agendar">Agendar</button>
    </div>
  );
};

export default RecipeCalendar;
