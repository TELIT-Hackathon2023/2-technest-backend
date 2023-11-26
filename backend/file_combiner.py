import os
import re
import json
from project_constants import *

def combine_md_files(main_directory, output_file):
    with open(output_file, 'w', encoding='utf-8') as output:
        for root, _, files in os.walk(main_directory):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as md_file:
                        output.write(md_file.read())
                        output.write('\n\n')  # Add a blank line between each file

def html_to_markdown(html_content):
    """
    Basic HTML to Markdown conversion for standard tags.
    """
    # Convert <p>, <h1> - <h6>, <ul>, <ol>, <li>
    markdown_content = html_content
    markdown_content = re.sub(r'<h([1-6])>(.*?)<\/h[1-6]>', lambda m: '#' * int(m.group(1)) + ' ' + m.group(2) + '\n', markdown_content)
    markdown_content = re.sub(r'<p>(.*?)<\/p>', r'\1\n', markdown_content)
    markdown_content = re.sub(r'<ul>(.*?)<\/ul>', r'\1', markdown_content)
    markdown_content = re.sub(r'<ol>(.*?)<\/ol>', r'\1', markdown_content)
    markdown_content = re.sub(r'<li>(.*?)<\/li>', r'- \1\n', markdown_content)

    return markdown_content

def extract_links_and_convert_tables(content, main_directory):
    """
    Convert Markdown links to plain text and HTML links to Markdown.
    """
    # Convert Markdown links to plain text and identify HTML file links
    def link_replacer(match):
        link_text = match.group(1)
        link_url = match.group(2)
        if link_url.lower().endswith('.html') and os.path.exists(os.path.join(main_directory, link_url)):
            with open(os.path.join(main_directory, link_url), 'r', encoding='utf-8') as html_file:
                html_content = html_file.read()
                return html_to_markdown(html_content)
        return link_text

    content = re.sub(r'\[(.*?)\]\((.*?)\)', link_replacer, content)

    # Find and convert tables to JSON
    tables_json = []
    tables = re.findall(r'(\|.*\|\n\|[-:| ]+\|((?:\n\|.*\|)+))', content)
    for table in tables:
        header, rows = table
        headers = [col.strip() for col in header.split('|') if col.strip()]
        rows_json = []
        for row in rows.strip().split('\n'):
            cols = [col.strip() for col in row.split('|') if col]
            rows_json.append(dict(zip(headers, cols)))
        tables_json.append(rows_json)

    # Remove the original Markdown tables from the content
    for table in tables:
        content = content.replace(table[0], '')

    return content, tables_json

def parse_md_file(input_file, output_file, main_directory):
    with open(input_file, 'r', encoding='utf-8') as md_file:
        content = md_file.read()

    # Process links and tables
    content, tables_json = extract_links_and_convert_tables(content, main_directory)

    # Write parsed content and JSON tables to bigdata.txt
    with open(output_file, 'w', encoding='utf-8') as out_file:
        out_file.write(content)
        for table_json in tables_json:
            out_file.write(json.dumps(table_json, indent=4))
            out_file.write('\n')


def process_md(repository_branch_names):
    path_to_docs_dir = f'{docs_source_directory}/{repository_branch_names}'
    # Combine all markdown files
    combine_md_files(path_to_docs_dir, combined_file)

    # Parse the combined markdown file
    parse_md_file(combined_file, output_file, path_to_docs_dir)

    print(f"Markdown files combined into {combined_file} and parsed into {output_file}")
