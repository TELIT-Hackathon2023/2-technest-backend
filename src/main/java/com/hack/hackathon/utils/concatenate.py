# import sys
import os
import sys
from langchain.document_loaders import TextLoader, JSONLoader
from langchain.indexes import VectorstoreIndexCreator

# import time

def concatenate_strings(arg1, arg2):
    result = arg1 + arg2
    return result

if __name__ == "__main__":
    # Check the number of command-line arguments
    if len(sys.argv) != 3:
        print("Usage: python example_script.py <string1> <string2>")
        sys.exit(1)

    # Get command-line arguments
    string1 = sys.argv[1]
    string2 = sys.argv[2]

    # Perform the operation
    result = concatenate_strings(string1, string2)

    # Print the result
    print("Concatenated result:", result)