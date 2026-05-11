import PanelShell from "../PanelShell";
import TwoColumns from "../TwoColumns";

export default function AboutPanel() {
  return (
    <PanelShell name="ABOUT">
      <TwoColumns
        left={
          <>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
            laboriosam dolore? Dignissimos rerum laudantium obcaecati recusandae
            esse quisquam, iusto, aperiam fugiat, dolores nihil quis voluptas
            eligendi. Adipisci facere doloremque earum!
          </>
        }
        right={
          <>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos, reiciendis sit! Odit, animi iure voluptatum quis magni
            alias? Commodi ad perspiciatis perferendis corporis quae aliquid
            dolore maxime voluptatem veniam minima.
          </>
        }
      />
    </PanelShell>
  );
}
