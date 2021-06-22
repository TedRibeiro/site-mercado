using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SiteMercado.Application.DTOs;
using SiteMercado.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace SiteMercado.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IApplicationServiceProduct _applicationServiceProduct;

        public ProductController(IApplicationServiceProduct applicationServiceProduct)
        {
            this._applicationServiceProduct = applicationServiceProduct;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_applicationServiceProduct.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_applicationServiceProduct.GetById(id));
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductDto productDTO)
        {
            try
            {
                if (productDTO == null)
                    return NotFound();

                _applicationServiceProduct.Add(productDTO);
                return Ok("Produto Cadastrado com sucesso!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] int id, [FromBody] ProductDto productDTO)
        {
            try
            {
                if (productDTO == null)
                    return NotFound();

                if (id != productDTO.Id)
                {
                    ModelState.AddModelError("Invalid", "Operação não permitida.");
                    return BadRequest(ModelState);
                }

                _applicationServiceProduct.Update(productDTO);
                return Ok("Produto atualizado com sucesso!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete()]
        public IActionResult Delete([FromBody] ProductDto productDTO)
        {
            try
            {
                if (productDTO == null)
                    return NotFound();

                _applicationServiceProduct.Remove(productDTO);
                return Ok("product Removido com sucesso!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }

        [HttpPost("upload"), DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileExtension = Path.GetExtension(fileName).ToLower();
                    var allowedExtensions = new string[] { ".jpeg", ".jpg", ".png" };
                    
                    if (!allowedExtensions.Contains(fileExtension))
                    {
                        ModelState.AddModelError("InvalidType", "Tipo inválido. Tipos aceitos: .jpg, .jpeg e .png");

                        return BadRequest(ModelState);
                    }

                    // Creating unique filename
                    fileName = $"{Guid.NewGuid()}_{DateTime.Now.Millisecond}_{fileExtension}";

                    var folderName = Path.Combine("Uploads", "Images");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var relativePath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { relativePath });
                }
                else
                {
                    ModelState.AddModelError("Required", "Selecione uma imagem para upload.");

                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
