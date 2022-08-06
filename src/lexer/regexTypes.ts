import { quotePatterns } from 'src/lexer/regexFactory';
import { Token } from 'src/lexer/token';

export interface IdentChars {
  // Additional characters that can be used as first character of an identifier.
  // That is: in addition to letters and underscore.
  first?: string;
  // Additional characters that can appear after the first character of identifier.
  // That is: in addition to letters, numbers and underscore.
  rest?: string;
  // True to allow single dashes (-) inside identifiers, but not at the beginning or end
  dashes?: boolean;
  // Allows identifier to begin with number
  allowFirstCharNumber?: boolean;
}

export type PlainQuoteType = keyof typeof quotePatterns;

export type PrefixedQuoteType = {
  quote: PlainQuoteType;
  prefixes: string[];
  requirePrefix?: boolean; // True when prefix is required
};

export type QuoteType = PlainQuoteType | PrefixedQuoteType;

export interface VariableRegex {
  regex: string;
}

export type VariableType = VariableRegex | PrefixedQuoteType;

export interface TokenizerOptions {
  // Main clauses that start new block, like: SELECT, FROM, WHERE, ORDER BY
  reservedCommands: string[];
  // Logical operator keywords, defaults to: [AND, OR]
  reservedLogicalOperators?: string[];
  // Keywords in CASE expressions that begin new line, like: WHEN, ELSE
  reservedDependentClauses: string[];
  // Keywords that create newline but no indentaion of their body.
  // These contain set operations like UNION
  reservedSetOperations: string[];
  // Various joins like LEFT OUTER JOIN
  reservedJoins: string[];
  // These are essentially multi-word sequences of keywords,
  // that we prioritize over normal keywords
  reservedPhrases?: string[];
  // built in function names
  reservedFunctionNames: string[];
  // all other reserved words (not included to any of the above lists)
  reservedKeywords: string[];
  // Types of quotes to use for strings
  stringTypes: QuoteType[];
  // Types of quotes to use for quoted identifiers
  identTypes: QuoteType[];
  // Types of quotes to use for variables
  variableTypes?: VariableType[];
  // Open-parenthesis characters
  openParens?: ('(' | '[' | '{' | '{-')[];
  // Close-parenthesis characters
  closeParens?: (')' | ']' | '}' | '-}')[];
  // True to allow for positional "?" parameter placeholders
  positionalParams?: boolean;
  // Prefixes for numbered parameter placeholders to support, e.g. :1, :2, :3
  numberedParamTypes?: ('?' | ':' | '$')[];
  // Prefixes for named parameter placeholders to support, e.g. :name
  namedParamTypes?: (':' | '@' | '$')[];
  // Prefixes for quoted parameter placeholders to support, e.g. :"name"
  // The type of quotes will depend on `identifierTypes` option.
  quotedParamTypes?: (':' | '@' | '$')[];
  // Line comment types to support, defaults to --
  lineCommentTypes?: string[];
  // Additional characters to support in identifiers
  identChars?: IdentChars;
  // Additional characters to support in named parameters
  // Use this when parameters allow different characters from identifiers
  // Defaults to `identChars`.
  paramChars?: IdentChars;
  // Additional multi-character operators to support, in addition to <=, >=, <>, !=
  operators?: string[];
  // Allows custom modifications on the token array.
  // Called after the whole input string has been split into tokens.
  // The result of this will be the output of the tokenizer.
  postProcess?: (tokens: Token[]) => Token[];
}
