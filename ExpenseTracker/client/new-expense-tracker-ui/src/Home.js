import AuthLink from "./AuthLink";
import ExpenseList from "./ExpenseList";
import TenMostRecent from "./TenMostRecent";

function Home() {
  return (
    <AuthLink>
      <header>
        <h1>Expenses</h1>
      </header>
      <div className="container mt-5">
        <section className="about">
        </section>
        <section>
          <TenMostRecent />
        </section>
      </div>
    </AuthLink>
  );
}

export default Home;
