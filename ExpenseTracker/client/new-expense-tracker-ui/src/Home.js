import AuthLink from "./AuthLink";
import ExpenseList from "./ExpenseList";

function Home() {
  return (
    <AuthLink>
      <header>
        <h1>Expenses</h1>
      </header>
      <div className="container">
        <section className="about">
          <h2>Expense Tracker Sheet</h2>
        </section>
        <section>
          <ExpenseList />
        </section>
        <footer>COPYRIGHT 2025</footer>
      </div>
    </AuthLink>
  );
}

export default Home;
