import AuthLink from "./AuthLink";
import ExpenseList from "./ExpenseList";
import TenMostRecent from "./TenMostRecent";

function Home() {
  return (
    <AuthLink>
      <header>
        <h1>Expenses</h1>
      </header>
      <div className="container">
        <section className="about">
          <h2 className="text-center">Expense Tracker Sheet</h2>
        </section>
        <section>
          <TenMostRecent />
        </section>
      </div>
    </AuthLink>
  );
}

export default Home;
