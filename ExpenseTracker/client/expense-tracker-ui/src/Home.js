import ExpenseList from "./ExpenseList";

function Home() {
  return (
    <>
      <header>
        <h1>Expenses</h1>
      </header>
      <div className="container">
        <section className="about">
          <h2>About the Expense</h2>
          <p>
            Skate ipsum dolor sit amet, fast plant deck air ollie north
            nosebone. Ollie hole dude Chris Livingston shinner mute-air airwalk.
            Skater 900 downhill soul skate mute-air. Streets on Fire ho-ho
            coffin 50-50 acid drop street. Pump transition Chris Pastras mini
            ramp mute-air 50-50. Gnarly Primo slide griptape kickturn death box.
            Shoveit invert Future Primitive speed wobbles nose grab spine.
            Stoked kick-nose egg plant skate key transfer. Betty hang ten
            half-cab fakie out Primo slide.
          </p>
          <p>
            Full-cab hand rail Saran Wrap crailtap pivot rad fastplant. Gnar
            bucket bail griptape birdie hardware kick-nose Jeremy Wray backside.
            Stalefish bigspin quarter pipe coping smith grind coper hand rail.
            Burnside 1080 roll-in poseur snake sketchy fakie trucks. Frontside
            heel flip slob air Elissa Steamer birdie hang up 720 Primo slide.
            Rad rocket air griptape hanger poseur kidney betty. Sponsored
            Wallows axle set 180 kidney stalefish mute-air berm. Gap full-cab
            270 fast plant sick deck melancholy. Full pipe Christ air Jimmy''Z
            slap maxwell salad grind kingpin masonite slam. Manual bail Kevin
            Harris bone air axle set masonite nose bump. 360 ollie hole manual
            backside Rick McCrank cess slide kidney aerial. 1080 lip NoMeansNo
            gnarly full pipe frigid air rocket air 180. Layback fakie out wax
            hard flip ledge coper lipslide.
          </p>
          <p>
            Late mongo ollie hole hanger. Method air nosegrind egg plant fakie.
            Disaster pump backside pressure flip. Regular footed frontside air
            kick-nose heel flip. Hurricane airwalk ollie north Shawn Dutton
            poseur. Cab flip nose bump rip grip hang ten. Rails ollie north
            frontside air wall ride. Fakie out nose blunt egg plant impossible.
            Hang up crailtap Johnny Rad poseur trucks. Shoveit crailtap
            handplant pivot. 900 grab lip rocket air. Lipslide drop in steps
            ollie north. Skater cess slide manual coffin.
          </p>
        </section>
        <section>
          <ExpenseList />
        </section>
        <footer>COPYRIGHT 2025</footer>
      </div>
    </>
  );
}

export default Home;
