import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function isNonEmpty(value) {
  if (value.trim() == "" || value.trim() == null) {
    return false;
  }
  return true;
}

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);

  async function submitOpinion(prevForm, formData) {
    const username = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!isNonEmpty(username)) {
      errors.push("Please enter a valid username");
    }
    if (!isNonEmpty(title)) {
      errors.push("Please enter a valid title");
    }
    if (!isNonEmpty(body)) {
      errors.push("Please enter a valid opinion");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          username,
          title,
          body,
        },
      };
    }

    await addOpinion({
      title,
      body,
      userName: username,
    });

    return {
      errors: null,
    };
  }

  const [formState, formAction] = useActionState(submitOpinion, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.username}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
