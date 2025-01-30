import styles from "@/styles/page.module.css";

interface PropsType {
  methodFunction: string;
  methods: { name: string; meaning: string }[];
  id: string;
}

const ApiReference = ({ methods, methodFunction, id }: PropsType) => {
  return (
    <div id={id} className={styles.methodReference}>
      <a href={`#${id}`}>{methodFunction}</a>
      <ul>
        {methods.map((method, index) => (
          <li key={index}>
            <p>{method.name}</p>
            <p>{method.meaning}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiReference;
