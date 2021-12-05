export default function RemoveObjectFields(
  object: Object,
  fields: string[] = [],
) {
  const output = { ...object };

  fields.forEach((field) => {
    delete output[field];
  });

  return output;
}
