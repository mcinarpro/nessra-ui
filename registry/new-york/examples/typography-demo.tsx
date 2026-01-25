import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "@/components/ui/typography"

export default function TypographyDemo() {
  return (
    <div className="space-y-8">
      <TypographyH1>The Joke Tax Chronicles</TypographyH1>

      <TypographyLead>
        A tale of taxes, jokes, and the people who tell them.
      </TypographyLead>

      <TypographyP>
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </TypographyP>

      <TypographyH2>The King&apos;s Plan</TypographyH2>

      <TypographyP>
        The king thought long and hard, and finally came up with{" "}
        <a href="#" className="text-primary underline underline-offset-4">
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </TypographyP>

      <TypographyBlockquote>
        &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&rdquo;
      </TypographyBlockquote>

      <TypographyH3>The Joke Tax</TypographyH3>

      <TypographyP>
        The king&apos;s subjects were not amused. They grumbled and complained,
        but the king was firm:
      </TypographyP>

      <TypographyList>
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners: 20 gold coins</li>
      </TypographyList>

      <TypographyH4>People Stopped Telling Jokes</TypographyH4>

      <TypographyP>
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to stop telling jokes: the
        court jester.
      </TypographyP>

      <TypographyP>
        Use the <TypographyInlineCode>console.log()</TypographyInlineCode>{" "}
        function to debug your code.
      </TypographyP>

      <div className="flex flex-col gap-2">
        <TypographyLarge>Large text for emphasis</TypographyLarge>
        <TypographySmall>Small text for fine print</TypographySmall>
        <TypographyMuted>Muted text for secondary content</TypographyMuted>
      </div>
    </div>
  )
}
