// Validación avanzada con real-time
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const ciudad = document.getElementById('ciudad').value.trim();
        const fecha = document.getElementById('fecha').value;
        const genero = document.getElementById('genero').value;
        const terminos = document.getElementById('terminos').checked;
        
        let valido = true;
    
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    
        if (nombre.length < 3) {
            document.getElementById('error-nombre').textContent = 'El nombre debe tener al menos 3 caracteres';
            valido = false;
        }
    
        if (cedula.length < 8) {
            document.getElementById('error-cedula').textContent = 'Ingresa una cédula válida';
            valido = false;
        }
    
        if (!email.includes('@')) {
            document.getElementById('error-email').textContent = 'Ingresa un correo válido';
            valido = false;
        }
    
        if (telefono.length < 10) {
            document.getElementById('error-telefono').textContent = 'Ingresa un teléfono válido';
            valido = false;
        }
    
        if (direccion.length < 5) {
            document.getElementById('error-direccion').textContent = 'Ingresa una dirección válida';
            valido = false;
        }
    
        if (ciudad.length < 3) {
            document.getElementById('error-ciudad').textContent = 'Ingresa una ciudad válida';
            valido = false;
        }
    
        if (!fecha) {
            document.getElementById('error-fecha').textContent = 'Selecciona tu fecha de nacimiento';
            valido = false;
        }
    
        if (!genero) {
            document.getElementById('error-genero').textContent = 'Selecciona un género';
            valido = false;
        }
    
        if (!terminos) {
            document.getElementById('error-terminos').textContent = 'Debes confirmar que la información es correcta';
            valido = false;
        }
    
        if (valido) {
            alert('¡Información registrada exitosamente!');
            this.reset();
        }
    });
    const form = document.querySelector('.formulario');
    const inputs = {
        nombre: document.getElementById('nombre'),
        cedula: document.getElementById('cedula'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono')
    };
    const errors = {
        nombre: document.getElementById('error-nombre'),
        cedula: document.getElementById('error-cedula'),
        email: document.getElementById('error-email'),
        telefono: document.getElementById('error-telefono')
    };

    // Funciones de validación
    function validarNombre(value) {
        if (!value.trim()) return 'El nombre es obligatorio.';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'El nombre solo puede contener letras y espacios.';
        return '';
    }

    function validarCedula(value) {
        if (!value.trim()) return 'La cédula es obligatoria.';
        if (value.length < 10) return 'Pon una cédula válida';
        if (!/^\d{8,10}$/.test(value)) return 'La cédula debe tener entre 8 y 10 dígitos.';
        return '';
    }

    function validarEmail(value) {
        if (!value.trim()) return 'El correo electrónico es obligatorio.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Ingresa un correo electrónico válido.';
        return '';
    }

    function validarTelefono(value) {
        if (!value.trim()) return 'El teléfono es obligatorio.';
        if (value.length < 10) return 'Pon un número de teléfono válido';
        if (!/^\d{10}$/.test(value)) return 'El teléfono debe tener 10 dígitos.';
        return '';
    }

    // Función para mostrar/ocultar errores
    function mostrarError(campo, mensaje) {
        errors[campo].textContent = mensaje;
        inputs[campo].classList.toggle('error', !!mensaje);
    }

    // Validar en tiempo real al perder foco
    Object.keys(inputs).forEach(campo => {
        inputs[campo].addEventListener('blur', function() {
            let mensaje = '';
            switch(campo) {
                case 'nombre':
                    mensaje = validarNombre(this.value);
                    break;
                case 'cedula':
                    mensaje = validarCedula(this.value);
                    break;
                case 'email':
                    mensaje = validarEmail(this.value);
                    break;
                case 'telefono':
                    mensaje = validarTelefono(this.value);
                    break;
            }
            mostrarError(campo, mensaje);
        });
    });

    // Validar al enviar el formulario
    form.addEventListener('submit', function(e) {
        let esValido = true;
        Object.keys(inputs).forEach(campo => {
            let mensaje = '';
            switch(campo) {
                case 'nombre':
                    mensaje = validarNombre(inputs[campo].value);
                    break;
                case 'cedula':
                    mensaje = validarCedula(inputs[campo].value);
                    break;
                case 'email':
                    mensaje = validarEmail(inputs[campo].value);
                    break;
                case 'telefono':
                    mensaje = validarTelefono(inputs[campo].value);
                    break;
            }
            mostrarError(campo, mensaje);
            if (mensaje) esValido = false;
        });

        if (!esValido) {
            e.preventDefault(); // Prevenir envío si hay errores
            alert('Por favor, corregir los errores en el formulario.');
        } else {
            // Aquí puedes agregar lógica para enviar el formulario, por ejemplo, con fetch
            alert('Formulario enviado correctamente.');
            // e.preventDefault(); // Descomenta si no quieres enviar realmente
        }
    });
});
