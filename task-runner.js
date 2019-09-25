let args = process.argv;
const filePath = args.slice(2)[0]
const funcName = args.slice(2)[1]

eval(`require(\"${filePath}\")\.${funcName}()`)